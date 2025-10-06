export const getWatchLists = async (set: any) => {
	const watchListsData = await window.commands.getWatchLists();
	set((state: any) => ({ ...state, watchLists: watchListsData }));
};
export const getWatchListById = async (set) => {};
export const searchWatchList = async (set) => {};
export const createWatchList = async (set) => {};
export const addToWatchList = async (set) => {};
export const updateWatchList = async (set) => {};
export const removeFromWatchList = async (set) => {};
export const removeWatchList = async (set) => {};
