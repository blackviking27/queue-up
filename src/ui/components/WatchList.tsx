import { useGlobalStore } from '@/lib/store';
import { useEffect, useRef, useState } from 'react';
import { Link, redirect, useParams } from 'react-router';
import type { TWatchListItem } from '@/types/type';
import ReorderableList from './ReorderableList';
import { Input } from './ui/input';
import { LoaderCircle, Plus } from 'lucide-react';
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
import { Button } from './ui/button';

export default function WatchList() {
	const params = useParams();
	const globalState = useGlobalStore((state) => state);
	const [watchList, setWatchList] = useState<TWatchListItem[]>([]);
	const [watchListMeta, setWatchListMeta] = useState<Record<string, any>>({});
	const [loading, setLoading] = useState(true);
	const [allowDragging, setAllowDragging] = useState(false);
	const [sortOrder, setSortOrder] = useState('asc');
	const [filter, setFilter] = useState(null);
	const searchTimeout = useRef<any>(null);

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

	// useEffect(() => {}, [sortOrder, filter]);

	const handleSearch = (searchString: string) => {
		if (searchTimeout.current) {
			clearTimeout(searchTimeout.current);
		}
		searchTimeout.current = setTimeout(() => {
			console.log('Search string', searchString);
			if (searchString === '') {
				setWatchList(globalState.watchList);
			} else {
				const filteredList = globalState.watchList.filter(
					(item) =>
						item.name
							.toLowerCase()
							.includes(searchString.toLowerCase()) ||
						(item.description?.toLowerCase() || '').includes(
							searchString.toLowerCase(),
						),
				);
				setWatchList(filteredList);
			}
		}, 200);
	};

	return (
		<div className="relative">
			<div className="sticky top-0 bg-white z-10 py-4">
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
					<div className="flex gap-2 justify-center items-center">
						<Select>
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="Sort order" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectItem value="asc">
										ascending
									</SelectItem>
									<SelectItem value="desc">
										descending
									</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
						<Select>
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="Filter by" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectItem value="asc">
										ascending
									</SelectItem>
									<SelectItem value="desc">
										descending
									</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
						<Button className="cursor-pointer">
							<Link
								className="flex justify-center items-center"
								to={`/add/${watchListMeta.id}/item`}
							>
								<Plus className="block" size={5} />
								<div>&nbsp;Add to list</div>
							</Link>
						</Button>
					</div>
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
