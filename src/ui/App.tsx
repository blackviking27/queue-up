// import { useState } from 'react';

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import AppSidebar from './components/SideBar';
import { NavLink, Route, Routes } from 'react-router';
import WatchLists from './components/WatchLists';
import WatchList from './components/WatchList';
import AddListForm from './components/AddListForm';
import AddItemForm from './components/AddItemForm';
import EditListForm from './components/EditList';
import EditItemForm from './components/EditItemForm';

function App() {
	return (
		<SidebarProvider>
			<AppSidebar />
			<main className=" w-screen px-[1%] py-[2%]">
				<div className="flex items-center justify-start">
					<SidebarTrigger />
					<NavLink to={'/'} className={'mx-1'}>
						Queue up
					</NavLink>
				</div>
				<section className="px-[1%]">
					<Routes>
						<Route path="/" element={<WatchLists />} />
						<Route path="/:watchListId" element={<WatchList />} />
						<Route path="/add/list" element={<AddListForm />} />
						<Route
							path="/add/:watchListId/item"
							element={<AddItemForm />}
						/>
						<Route
							path="/edit/list/:watchListId"
							element={<EditListForm />}
						/>
						<Route
							path="/edit/item/:itemId"
							element={<EditItemForm />}
						/>
					</Routes>
				</section>
			</main>
		</SidebarProvider>
	);
}

export default App;
