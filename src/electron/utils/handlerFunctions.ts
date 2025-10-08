import {
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
		console.log(`Name: ${params.listName} Desc : ${params.description}`);
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
