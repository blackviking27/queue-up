import {
	addWatchlistItemToDB,
	createWatchListInDb,
	getWatchListByIdFromDB,
	getWatchListsFromDB,
	updateWatchListInDB,
	updateWatchListItemInDB,
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

		const data = await addWatchlistItemToDB(
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

export const updateWatchList = async (params: {
	watchListId: number;
	name: string;
	description: string;
}): Promise<unknown> => {
	try {
		const data = await updateWatchListInDB(
			params.watchListId,
			params.name,
			params.description,
		);
		return data;
	} catch (err) {
		console.log('Error while updating the list', err);
		throw new Error('Error while updating the list');
	}
};

export const updateWatchListItem = async (params: {
	itemId: number;
	name: string;
	description: string;
	status: string;
	type: string;
}): Promise<unknown> => {
	try {
		const data = await updateWatchListItemInDB(
			params.itemId,
			params.name,
			params.description,
			params.status,
			params.type,
		);
		return data;
	} catch (err) {
		console.log('Error while updating the list', err);
		throw new Error('Error while updating the list');
	}
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
