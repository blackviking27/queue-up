// import { useState } from 'react';

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import AppSidebar from './components/SideBar';

function App() {
	// const [watchLists, setWatchLists] = useState([]);
	return (
		<SidebarProvider>
			<AppSidebar />
			<main className="w-screen px-[1%] py-[2%]">
				<div className="flex items-center justify-start">
					<SidebarTrigger />

					<span className="mx-1">Queue Up</span>
				</div>
				<section></section>
			</main>
		</SidebarProvider>
	);
}

export default App;
