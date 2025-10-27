import { Edit, EllipsisVertical, List } from 'lucide-react';
import { Badge } from './ui/badge';
import { Link } from 'react-router';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

const ListItem = ({ item, key }: { item: any; key: number }) => {
	return (
		<div
			key={key}
			className="flex justify-between items-center px-6 py-3 border-2 rounded-md mt-4"
		>
			<Link
				to={`/${item.id}`}
				className="flex justify-between items-center"
			>
				<List />
				<div className="px-4">
					<div className="text-xl">{item?.name ?? '??'}</div>
					<div className="text-gray-500">
						{item?.description ?? 'Nothing to describe here'}
					</div>
				</div>
			</Link>
			<div className="flex justify-center items-center">
				<Badge>{item?.totalCount ?? 0}</Badge>
				<Popover>
					<PopoverTrigger>
						<EllipsisVertical className="z-50" />
					</PopoverTrigger>
					<PopoverContent>
						<Link
							to={`/edit/list/${item.id}`}
							className="flex justify-self-start items-center gap-2 cursor-pointer"
						>
							<Edit size={10} />
							Edit
						</Link>
					</PopoverContent>
				</Popover>
			</div>
		</div>
	);
};

export default ListItem;
