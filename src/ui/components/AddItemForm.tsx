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
import { useEffect, useState } from 'react';
import { LoaderIcon } from 'lucide-react';
import { Toaster } from './ui/sonner';
import { toast } from 'sonner';
import { useGlobalStore } from '@/lib/store';
import { ITEM_TYPES, STATUS } from '@/types/type';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from './ui/select';
import { redirect, useNavigate, useParams } from 'react-router';

const formSchema = z.object({
	name: z.string().min(2, {
		message: 'List Name should atleast be 2 characters long.',
	}),
	description: z.string().optional(),
	status: z.enum(STATUS),
	type: z.enum(ITEM_TYPES),
});

function FormComponent({ watchListId }: any) {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			description: '',
			status: 'Not started',
			type: 'anime',
		},
	});
	async function onSubmit(values: z.infer<typeof formSchema>) {
		setLoading(true);
		try {
			const data = await window.commands.addToWatchList({
				...values,
				watchListId: watchListId,
			});
			if (data == undefined) {
				toast.error('Failed to add watchlist');
			} else {
				toast.success('Added Successfully');
				redirect(`/${watchListId}`);
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
								navigate(`/${watchListId}`);
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

export default function AddItemForm() {
	const params = useParams();
	const globalState = useGlobalStore((state) => state);
	const [watchListMeta, setWatchListMeta] = useState<Record<string, any>>({});

	useEffect(() => {
		if (!params.id) {
			redirect('/');
		}
		setWatchListMeta(globalState.currWatchListMeta ?? {});
	}, []);

	return (
		<div>
			<div className="text-2xl">Add data to {watchListMeta.name}</div>
			<FormComponent watchListId={watchListMeta.id} />
			<Toaster />
		</div>
	);
}
