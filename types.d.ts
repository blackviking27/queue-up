interface Window {
	commands: {
		getWatchLists: () => unknown;
		getWatchListById: (listId: string) => unknown;
		searchWatchList: () => unknown;
		createWatchList: () => void;
		addToWatchList: (animeId: string) => unknown;
		updateWatchList: (animeId: string, status: string) => unknown;
		removeFromWatchList: () => unknown;
		removeWatchList: () => unknown;
	};
}
