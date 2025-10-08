import { useEffect, useState } from 'react';
import { Plus, Settings2 } from 'lucide-react';
import { watchListsData } from './dummyData';
import { Badge } from './ui/badge';
import ListItem from './ListItem';
import { useGlobalStore } from '@/lib/store';
import { Button } from './ui/button';
import { Link } from 'react-router';

export default function WatchLists() {
	const [watchLists, setWatchLists] = useState<any[]>(watchListsData);
	const zustandGetWatchLists = useGlobalStore((state) => state.getWatchLists);
	const storeWatchLists = useGlobalStore((state) => state.watchLists);
	useEffect(() => {
		const getWatchLists = async () => {
			zustandGetWatchLists();
		};
		getWatchLists();
	}, []);

	useEffect(() => {
		setWatchLists(storeWatchLists);
	}, [storeWatchLists]);

	return (
		<section className="px-[10px]">
			<div className="sticky top-0 bg-white">
				<div className="py-3 flex justify-between items-center">
					<div className="flex justify-center items-center">
						<span className="text-2xl font-semibold">
							WatchLists
						</span>
						<span className="ml-2">
							<Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">
								{watchLists.length ?? 0}
							</Badge>
						</span>
					</div>
					<span>
						<Settings2 size={16} />
					</span>
				</div>
			</div>
			<div className="w-full h-full">
				{/* List of watch Lists */}
				{watchLists.map((item, index) => (
					<ListItem item={item} key={index} />
				))}
			</div>
			<Button className="fixed bottom-4 right-4 z-50 cursor-pointer">
				<Link
					className="flex justify-center items-center"
					to="/add/list"
				>
					<Plus className="block" size={5} />
					<div>&nbsp;Create</div>
				</Link>
			</Button>
		</section>
	);
}
