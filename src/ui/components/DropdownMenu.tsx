import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from './ui/dropdown-menu';

const DropdownMenuComponent = ({
	title = 'menu',
	options = [],
}: {
	title: string;
	options: string[];
}) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>{title}</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuSeparator />
				{options.map((e, idx) => (
					<DropdownMenuItem key={idx}>{e}</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default DropdownMenuComponent;
