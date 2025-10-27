import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { number, z } from 'zod';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from './ui/select';
import { toast } from 'sonner';
import { LoaderIcon } from 'lucide-react';
import { ITEM_TYPES, STATUS } from '@/types/type';
import { useEffect, useState } from 'react';
import { redirect, useNavigate, useParams } from 'react-router';
import { useGlobalStore } from '@/lib/store';

const formSchema = z.object({
	name: z.string().min(2, {
		message: 'List Name should atleast be 2 characters long.',
	}),
	description: z.string().optional(),
	status: z.enum(STATUS),
	type: z.enum(ITEM_TYPES),
});

function ListItemForm({ watchListId }: any) {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const params = useParams();
	const isEditing = location.pathname.includes('edit/item');
	const currentWatchList = useGlobalStore((state) => state.watchList);
	const [listId, setListId] = useState('');
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			description: '',
			status: '',
			type: '',
		},
	});

	useEffect(() => {
		const preFillDataIfEditing = async () => {
			if (isEditing) {
				const itemData = currentWatchList.filter(
					(item) => item.id.toString() === params.itemId,
				);
				setListId((itemData[0] as any)?.watchListId);
				form.reset({
					name: itemData[0]?.name,
					description: itemData[0]?.description,
					status: itemData[0]?.status,
					type: itemData[0]?.type,
				});
			}
		};
		preFillDataIfEditing();
	}, []);

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setLoading(true);
		try {
			let data;
			if (isEditing) {
				data = await window.commands.updateWatchListItem({
					itemId: params.itemId,
					name: values.name,
					description: values.description,
					status: values.status,
					type: values.type,
				});
			} else {
				data = await window.commands.addToWatchList({
					...values,
					watchListId: watchListId,
				});
			}

			if (data == undefined) {
				toast.error('Failed to add watchlist');
			} else {
				toast.success('Added Successfully');
				redirect(
					isEditing && listId ? `/${listId}` : `/${watchListId}`,
				);
			}
		} catch (err) {
			toast.error('Error while adding watch lsit');
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
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
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
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="type"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Type</FormLabel>
							<Select
								onValueChange={field.onChange}
								value={field.value}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select Type" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{(
										Object.keys(
											ITEM_TYPES,
										) as (keyof typeof ITEM_TYPES)[]
									).map((k) => (
										<SelectItem value={ITEM_TYPES[k]}>
											{ITEM_TYPES[k]}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="status"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Status</FormLabel>
							<Select
								onValueChange={field.onChange}
								value={field.value}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select Status" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{(
										Object.keys(
											STATUS,
										) as (keyof typeof STATUS)[]
									).map((k) => (
										<SelectItem value={STATUS[k]}>
											{STATUS[k]}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
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
								navigate(
									isEditing && listId
										? `/${listId}`
										: `/${watchListId}`,
								);
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

export default ListItemForm;
