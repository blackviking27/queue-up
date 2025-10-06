import { create } from 'zustand';
import type { TWatchList, TWatchListItem } from '../types/type';

type Store = {
	watchLists: TWatchList[];
	watchList: TWatchListItem[];
	currWatchListMeta?: Record<string, unknown>;
	getWatchLists: () => void;
	getWatchListById: (id: string) => Promise<void>;
	searchWatchList: () => Promise<void>;
	createWatchList: () => Promise<any>;
	addToWatchList: () => Promise<any>;
	updateWatchList: () => Promise<any>;
	removeFromWatchList: () => Promise<any>;
	removeWatchList: () => Promise<any>;
};

export const useGlobalStore = create<Store>((set) => ({
	watchLists: [],
	watchList: [],
	currWatchListMeta: {},
	getWatchLists: async () => {
		const data = await window.commands.getWatchLists();
		set(() => ({ watchLists: data as TWatchList[] }));
	},
	getWatchListById: async (watchListId: string) => {
		const data: any = await window.commands.getWatchListById(watchListId);
		set((state) => ({
			...state,
			currWatchListMeta: data.meta[0],
			watchList: data?.data as TWatchListItem[],
		}));
	},
	searchWatchList: async () => {},
	createWatchList: async () => {},
	addToWatchList: async () => {},
	updateWatchList: async () => {},
	removeFromWatchList: async () => {},
	removeWatchList: async () => {},
}));
