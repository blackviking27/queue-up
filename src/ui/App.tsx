// import { useState } from 'react';

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import AppSidebar from './components/SideBar';
import { NavLink, Route, Routes } from 'react-router';
import WatchLists from './components/WatchLists';
import WatchList from './components/WatchList';

function App() {
	// const [watchLists, setWatchLists] = useState([]);
	return (
		<SidebarProvider>
			<AppSidebar />
			<main className="w-screen px-[1%] py-[2%]">
				<div className="flex items-center justify-start">
					<SidebarTrigger />
					<NavLink to={'/'} className={'mx-1'}>
						Queue up
					</NavLink>
				</div>
				<section>
					<Routes>
						<Route path="/" element={<WatchLists />} />
						<Route path="/:watchListId" element={<WatchList />} />
					</Routes>
				</section>
			</main>
		</SidebarProvider>
	);
}

export default App;
