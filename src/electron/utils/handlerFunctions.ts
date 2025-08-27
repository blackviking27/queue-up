import { WatchListItem } from './types.js';

export const getWatchLists = (): Promise<unknown> => {
	return {};
};

export const getWatchListById = ({
	watchListId,
}: {
	watchListId: string;
}): Promise<unknown> => {
	return {};
};

export const searchWatchList = ({
	watchListName,
}: {
	watchListName: string;
}): Promise<unknown> => {
	return {};
};

export const createWatchList = ({
	watchListName,
}: {
	watchListName: string;
}): Promise<unknown> => {
	return 'success';
};

export const addToWatchList = ({
	watchListId,
	itemDetails,
}: {
	watchListId: string;
	itemDetails: WatchListItem;
}): Promise<unknown> => {
	return 'success';
};

export const updateWatchList = ({
	watchListId,
	itemDetails,
}: {
	watchListId: string;
	itemDetails: WatchListItem;
}): Promise<unknown> => {
	return 'success';
};

export const removeFromWatchList = ({
	watchListId,
	itemId,
}: {
	watchListId: string;
	itemId: string;
}): Promise<unknown> => {
	return 'success';
};

export const removeWatchList = ({
	watchListId,
}: {
	watchListId: string;
}): Promise<unknown> => {
	return 'success';
};
