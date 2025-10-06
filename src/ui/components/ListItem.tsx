import { EllipsisVertical, Glasses } from 'lucide-react';
import { Badge } from './ui/badge';
import { Link } from 'react-router';

const ListItem = ({ item, key }: { item: any; key: number }) => {
	return (
		<Link
			to={`/${item.id}`}
			key={key}
			className="flex justify-between items-center px-6 py-3 border-2 rounded-md mt-4"
		>
			<div className="flex justify-between items-center">
				<Glasses />
				<div className="px-4">
					<div className="text-xl">{item?.name ?? '??'}</div>
					<div className="text-gray-500">
						{item?.description ?? 'Nothing to describe here'}
					</div>
				</div>
			</div>
			<div className="flex justify-center items-center">
				<Badge>{item?.totalItems ?? 0}</Badge>
				<EllipsisVertical />
			</div>
		</Link>
	);
};

export default ListItem;
