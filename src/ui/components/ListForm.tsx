import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { LoaderIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useLocation, useNavigate, useParams } from 'react-router';
import { useGlobalStore } from '@/lib/store';

const formSchema = z.object({
	listName: z.string().min(2, {
		message: 'List Name should atleast be 2 characters long.',
	}),
	description: z.string().optional(),
});

function ListForm() {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();
	const params = useParams();
	const storeWatchLists = useGlobalStore((state) => state.watchLists);
	const isEditing = location.pathname.includes('edit/list');

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			listName: '',
			description: '',
		},
	});

	useEffect(() => {
		const prefillDataIfEditing = () => {
			if (isEditing) {
				const data: any = storeWatchLists.filter(
					(item) => item.id.toString() === params.watchListId,
				);
				form.reset({
					listName: data?.[0]?.name,
					description: data?.[0]?.description,
				});
			}
		};
		prefillDataIfEditing();
	}, []);

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setLoading(true);
		try {
			let data;
			if (isEditing) {
				data = await window.commands.updateWatchList({
					watchListId: params.watchListId,
					name: values.listName,
					description: values.description,
				});
			} else {
				data = await window.commands.createWatchList({
					listName: values.listName,
					description: values.description,
				});
			}
			if (data == undefined) {
				toast.error('Failed to update watchlist');
			} else {
				toast.success('Updated Successfully');
				setTimeout(() => {
					navigate('/');
				}, 1000);
			}
		} catch (err) {
			toast.error('Error while upodating watch lsit');
		}
		setLoading(false);
	}
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-4 mt-4"
			>
				<FormField
					control={form.control}
					name="listName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>List Name</FormLabel>
							<FormDescription>Name of your list</FormDescription>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormDescription>
								Small introduction regarding your list
							</FormDescription>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{loading ? (
					<LoaderIcon />
				) : (
					<>
						<Button
							className="mr-2"
							variant={'outline'}
							onClick={(e) => {
								e.preventDefault();
								navigate('/');
							}}
						>
							Cancel
						</Button>
						<Button type="submit">Submit</Button>
					</>
				)}
			</form>
		</Form>
	);
}

export default ListForm;
