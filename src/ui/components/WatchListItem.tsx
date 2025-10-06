import { Badge } from './ui/badge';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from './ui/select';

const StatusSelect = ({
	status,
	setStatus,
}: {
	status: string;
	setStatus: (status: string) => void;
}) => {
	const STATUS = [
		{
			name: 'not started',
			color: 'grey',
		},
		{
			name: 'watching',
			color: 'blue',
		},
		{
			name: 'finished',
			color: 'green',
		},
		{
			name: 'dropped',
			color: 'red',
		},
	];
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
					{STATUS.map(
						(statusItem: { name: string; color: string }) => (
							<SelectItem
								className={`text-${statusItem.color}`}
								value={statusItem.name}
							>
								{statusItem.name}
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
	order,
	title,
	description,
	status,
	type,
}: {
	key: number;
	order: number;
	title: string;
	description: string;
	status: string;
	type: string;
}) => {
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
				<Badge className="flex items-center justify-center">
					{type}
				</Badge>
				<div className="my-1">{description}</div>
			</div>
			<div className="flex justify-between items-center gap-1">
				<StatusSelect status={status} setStatus={() => {}} />
			</div>
		</div>
	);
};
