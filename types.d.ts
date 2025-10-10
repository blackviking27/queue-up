interface Window {
	commands: {
		getWatchLists: () => unknown;
		getWatchListById: (listId: string) => unknown;
		searchWatchList: () => unknown;
		createWatchList: (params: Record<string, unknown>) => void;
		addToWatchList: (params: Record<string, unknown>) => unknown;
		updateWatchList: (animeId: string, status: string) => unknown;
		removeFromWatchList: () => unknown;
		removeWatchList: () => unknown;
	};
}
