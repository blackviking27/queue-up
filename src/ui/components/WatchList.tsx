import { useGlobalStore } from '@/lib/store';
import { useEffect, useState } from 'react';
import { redirect, useParams } from 'react-router';
import type { TWatchListItem } from '@/types/type';
import ReorderableList from './ReorderableList';
import { Input } from './ui/input';
import { LoaderCircle } from 'lucide-react';
import { Badge } from './ui/badge';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from './ui/select';

export default function WatchList() {
	const params = useParams();
	const globalState = useGlobalStore((state) => state);
	const [watchList, setWatchList] = useState<TWatchListItem[]>([]);
	const [watchListMeta, setWatchListMeta] = useState<Record<string, any>>({});
	const [loading, setLoading] = useState(true);
	const [allowDragging, setAllowDragging] = useState(false);
	const [sortOrder, setSortOrder] = useState('asc');
	const [filter, setFilter] = useState(null);

	useEffect(() => {
		const getListData = async () => {
			const listId = params.watchListId || '';
			if (!listId) {
				redirect('/');
			}
			globalState.getWatchListById(listId);
		};

		getListData();
		return () => {
			setLoading(false);
		};
	}, []);

	useEffect(() => {
		setLoading(true);
		setWatchList(globalState.watchList);
		setWatchListMeta(globalState.currWatchListMeta ?? {});
		setLoading(false);
	}, [globalState.watchList]);

	useEffect(() => {}, [sortOrder, filter]);

	const handleSearch = (searchString: string) => {
		console.log('Searched >>>', searchString);
	};

	return (
		<div>
			<div>
				<h1 className="text-2xl">{watchListMeta?.name}</h1>
				<div className="flex items-center justify-between">
					<div>
						{watchListMeta.description ?? 'Nothing to describe'}
					</div>
					<Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">
						{watchList.length ?? 0}
					</Badge>
				</div>
			</div>
			<div className="my-4 flex justify-between items-center">
				<Input
					type="text"
					placeholder="Search"
					onChange={(e) => handleSearch(e.target.value)}
					className="max-w-[20%]"
				/>
				<div className="flex  justify-center items-center">
					<Select>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Sort order" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectItem value="asc">ascending</SelectItem>
								<SelectItem value="desc">descending</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
					<Select>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Filter by" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectItem value="asc">ascending</SelectItem>
								<SelectItem value="desc">descending</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
			</div>
			{loading ? (
				<LoaderCircle size={10} rotate={'true'} />
			) : (
				<ReorderableList
					list={watchList}
					setList={setWatchList}
					allowDragging={allowDragging}
				/>
			)}
		</div>
	);
}
