interface Window {
	commands: {
		getWatchLists: () => unknown;
		getWatchListById: (listId: string) => unknown;
		searchWatchList: () => unknown;
		createWatchList: (params: Record<string, unknown>) => void;
		addToWatchList: (params: Record<string, unknown>) => unknown;
		updateWatchList: (params: Record<string, unknown>) => unknown;
		updateWatchListItem: (params: Record<string, unknown>) => unknown;
		removeFromWatchList: () => unknown;
		removeWatchList: () => unknown;
	};
}
