import {
	addWatchlistItemToDB,
	createWatchListInDb,
	getWatchListByIdFromDB,
	getWatchListsFromDB,
} from '../database/db.js';
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

export const createWatchList = async (params: {
	listName: string;
	description?: string;
}): Promise<unknown> => {
	try {
		const data = await createWatchListInDb(
			params.listName,
			params.description,
		);
		return data;
	} catch (err) {
		console.log('Error while creating watch list', JSON.stringify(err));
		throw new Error('Error while creating watch list');
	}
};

export const addToWatchList = async (
	params: Record<string, any>,
): Promise<unknown> => {
	try {
		const { name, description, status, type, watchListId } = params;

		const data = addWatchlistItemToDB(
			name,
			description,
			status,
			type,
			watchListId,
		);
		return data;
	} catch (err) {
		console.log('Error while inserting data', err);
		throw new Error('Error while inserting data');
	}
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
