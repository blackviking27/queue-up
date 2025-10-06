import { useRef } from 'react';
import { WatchListItem } from './WatchListItem';

const ReorderableList = ({
	list,
	setList,
	allowDragging = false,
}: {
	list: any[];
	setList: (list: any[]) => void;
	allowDragging: boolean;
}) => {
	const dragElement = useRef<number>(0); // Element you are dragging
	const dragElementOver = useRef<number>(0); // Element over which the dragged element is placed

	const handleListOrdering = () => {
		const updatedList = [...list];
		const dragElementComponent = updatedList[dragElement.current];
		updatedList[dragElement.current] = updatedList[dragElementOver.current];
		updatedList[dragElementOver.current] = dragElementComponent;

		setList(updatedList);
	};

	return (
		<div className="flex-col justify-center items-center gap-2">
			{list.map((listItem, index) => (
				<div
					className="mb-4"
					draggable={allowDragging}
					onDragStart={() => (dragElement.current = index)}
					onDragEnter={() => (dragElementOver.current = index)}
					onDragEnd={handleListOrdering}
					onDragOver={(e) => e.preventDefault()}
				>
					<WatchListItem
						key={index}
						order={index + 1}
						title={listItem?.title || listItem?.name}
						description={listItem?.description}
						status={listItem?.status}
						type={listItem?.type}
					/>
				</div>
			))}
		</div>
	);
};

export default ReorderableList;
