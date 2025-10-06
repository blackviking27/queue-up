import { getWatchListByIdFromDB, getWatchListsFromDB } from '../database/db.js';
import { WatchListItem } from './types.js';

export const getWatchLists = (): any[] => {
	const data = getWatchListsFromDB();
	return data;
};

export const getWatchListById = ({
	watchListId,
}: {
	watchListId: string;
}): Promise<unknown> => {
	return getWatchListByIdFromDB(watchListId);
};

export const searchWatchList = ({
	watchListName,
}: {
	watchListName: string;
}): Promise<unknown> => {
	return new Promise(() => {});
};

export const createWatchList = ({
	watchListName,
}: {
	watchListName: string;
}): Promise<unknown> => {
	return new Promise(() => {});
};

export const addToWatchList = ({
	watchListId,
	itemDetails,
}: {
	watchListId: string;
	itemDetails: WatchListItem;
}): Promise<unknown> => {
	return new Promise(() => {});
};

export const updateWatchList = ({
	watchListId,
	itemDetails,
}: {
	watchListId: string;
	itemDetails: WatchListItem;
}): Promise<unknown> => {
	return new Promise(() => {});
};

export const removeFromWatchList = ({
	watchListId,
	itemId,
}: {
	watchListId: string;
	itemId: string;
}): Promise<unknown> => {
	return new Promise(() => {});
};

export const removeWatchList = ({
	watchListId,
}: {
	watchListId: string;
}): Promise<unknown> => {
	return new Promise(() => {});
};
