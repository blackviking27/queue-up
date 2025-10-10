const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('commands', {
	getWatchLists: () => ipcRendererInvoke('getWatchLists'),
	getWatchListById: (watchListId: string) =>
		ipcRendererInvoke('getWatchListById', { watchListId }),

	searchWatchList: (watchListName: string) =>
		ipcRendererInvoke('searchWatchList', { watchListName }),

	createWatchList: (params: Record<string, any>) =>
		ipcRendererInvoke('createWatchList', params),
	addToWatchList: (params: Record<string, any>) =>
		ipcRendererInvoke('addToWatchList', params),

	updateWatchList: (watchListId: string, itemDetails: any) =>
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
