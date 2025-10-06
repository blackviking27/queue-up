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

export const ItemTypes = {
	MOVIE: 'movie',
	ANIME: 'anime',
} as const;

export type ItemTypes = (typeof ItemTypes)[keyof typeof ItemTypes];
