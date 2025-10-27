import ListForm from './ListForm';
import { Toaster } from './ui/sonner';

export default function EditListForm() {
	return (
		<div>
			<div className="text-2xl">Edit watchlist</div>
			<ListForm />
			<Toaster />
		</div>
	);
}
