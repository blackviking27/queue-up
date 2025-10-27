import { useEffect, useState } from 'react';
import { Toaster } from './ui/sonner';
import { useGlobalStore } from '@/lib/store';
import { redirect, useParams } from 'react-router';
import ListItemForm from './ListItemForm';

export default function AddItemForm() {
	const params = useParams();
	const globalState = useGlobalStore((state) => state);
	const [watchListMeta, setWatchListMeta] = useState<Record<string, any>>({});

	useEffect(() => {
		if (!params.watchListId) {
			redirect('/');
		}
		setWatchListMeta(globalState.currWatchListMeta ?? {});
	}, []);

	return (
		<div>
			<div className="text-2xl">Add data to {watchListMeta.name}</div>
			<ListItemForm watchListId={watchListMeta.id} />
			<Toaster />
		</div>
	);
}
