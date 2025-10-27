import { Edit, EllipsisVertical, Trash } from 'lucide-react';
import { Badge } from './ui/badge';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from './ui/select';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Link } from 'react-router';
import { STATUS } from '@/types/type';

const StatusSelect = ({
	status,
	setStatus,
}: {
	status: string;
	setStatus: (status: string) => void;
}) => {
	// const STATUS = [
	// 	{
	// 		name: 'not started',
	// 		color: 'grey',
	// 	},
	// 	{
	// 		name: 'watching',
	// 		color: 'blue',
	// 	},
	// 	{
	// 		name: 'finished',
	// 		color: 'green',
	// 	},
	// 	{
	// 		name: 'dropped',
	// 		color: 'red',
	// 	},
	// ];
	return (
		<Select
			onValueChange={(e: string) => setStatus(e)}
			defaultValue={status}
		>
			<SelectTrigger>
				<SelectValue placeholder="Change Status" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{(Object.keys(STATUS) as (keyof typeof STATUS)[]).map(
						(statusItem) => (
							<SelectItem value={STATUS[statusItem]}>
								{STATUS[statusItem]}
							</SelectItem>
						),
					)}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
};

export const WatchListItem = ({
	key,
	id,
	order,
	title,
	description,
	status,
	type,
}: {
	key: number;
	id: number;
	order: number;
	title: string;
	description: string;
	status: string;
	type: string;
}) => {
	const handleDelete = () => {};

	return (
		<div
			key={key}
			className="border-2 rounded-md px-[2rem] py-[1rem] flex justify-between align-middle"
		>
			<div>
				<h3 className="text-2xl font-bold">
					<span className="mr-2">{order}.</span>
					{title}
				</h3>
				<div className="my-1">{description}</div>
				<Badge className="flex items-center justify-center">
					{type}
				</Badge>
			</div>
			<div className="flex justify-between items-center gap-1">
				<StatusSelect status={status} setStatus={() => {}} />
				<Popover>
					<PopoverTrigger>
						<EllipsisVertical size={20} className="z-50" />
					</PopoverTrigger>
					<PopoverContent className="min-w-fit gap-6">
						<Link
							to={`/edit/item/${id}`}
							className="flex justify-self-start items-center gap-2 cursor-pointer"
						>
							<Edit size={15} />
							Edit
						</Link>
						<div className="flex items-center justify-self-start text-red-600 gap-2 cursor-pointer">
							<Trash size={15} onClick={handleDelete} />
							<span>Remove</span>
						</div>
					</PopoverContent>
				</Popover>
			</div>
		</div>
	);
};
