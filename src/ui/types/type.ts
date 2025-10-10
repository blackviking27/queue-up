export type TWatchList = {
	id: string;
	name: string;
	description: string;
	img?: string;
	totalItems?: string;
};

export type TWatchListItem = {
	id: string;
	name: string;
	description: string;
	status: string;
	type: string;
	rating?: string;
	img?: string;
	badges?: string[];
};

export const ITEM_TYPES = {
	MOVIE: 'movie',
	ANIME: 'anime',
	BOOKS: 'books',
	GAMES: 'games',
	SERIES: 'series',
};

export const STATUS = {
	NOT_STARTED: 'Not started',
	WATCHING: 'Watching',
	FINISHED: 'Finished',
	DROPPED: 'DROPPED',
};
