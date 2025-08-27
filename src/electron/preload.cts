import { WatchListItem } from './utils/types';

const { contextBridge, ipcRenderer } = require('electron');
const { FETCH_ANIME_DETAIL, SEARCH_ANIME } = require('../utils/methods');

contextBridge.exposeInMainWorld('commands', {
	getWatchLists: () => ipcRendererInvoke('getWatchLists'),
	getWatchListById: (watchListId: string) =>
		ipcRendererInvoke('getWatchListById', { watchListId }),

	searchWatchList: (watchListName: string) =>
		ipcRendererInvoke('searchWatchList', { watchListName }),

	createWatchList: (watchListName: string) =>
		ipcRendererInvoke('createWatchList', { watchListName }),
	addToWatchList: (watchListId: string, itemDetails: WatchListItem) =>
		ipcRendererInvoke('addToWatchList', { watchListId, itemDetails }),

	updateWatchList: (watchListId: string, itemDetails: WatchListItem) =>
		ipcRendererInvoke('updateWatchList', { watchListId, itemDetails }),

	removeFromWatchList: (watchListId: string, itemId: string) =>
		ipcRendererInvoke('removeFromWatchList', { watchListId, itemId }),
	removeWatchList: (watchListId: string) =>
		ipcRendererInvoke('removeWatchList', { watchListId }),
});

const ipcRendererInvoke = (
	method: string,
	params: Record<string, unknown> = {},
) => {
	return ipcRenderer.invoke(method, params);
};
