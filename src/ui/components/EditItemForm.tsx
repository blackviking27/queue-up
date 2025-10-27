import ListItemForm from './ListItemForm';
import { Toaster } from './ui/sonner';

export default function EditItemForm() {
	return (
		<div>
			<div className="text-2xl">Edit Item</div>
			<ListItemForm />
			<Toaster />
		</div>
	);
}
