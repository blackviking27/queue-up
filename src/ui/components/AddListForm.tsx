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
import { useState } from 'react';
import { LoaderIcon } from 'lucide-react';
import { Toaster } from './ui/sonner';
import { toast } from 'sonner';

const formSchema = z.object({
	listName: z.string().min(2, {
		message: 'List Name should atleast be 2 characters long.',
	}),
	description: z.string().optional(),
});

function FormComponent() {
	const [loading, setLoading] = useState(false);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			listName: '',
			description: '',
		},
	});
	async function onSubmit(values: z.infer<typeof formSchema>) {
		setLoading(true);
		try {
			const data = await window.commands.createWatchList(values);
			if (data == undefined) {
				toast.error('Failed to add watchlist');
			} else {
				toast.success('Added Successfully');
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
					<Button type="submit">Submit</Button>
				)}
			</form>
		</Form>
	);
}

export default function AddListForm() {
	return (
		<div>
			<div className="text-2xl">Create watchlist</div>
			<FormComponent />
			<Toaster />
		</div>
	);
}
