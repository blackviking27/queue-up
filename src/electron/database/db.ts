import Database from 'better-sqlite3';

const db = new Database('app.db');

export const createWatchLsitsTable = () => {
	console.log('START: Creating watchLists (if not exists)');
	try {
		const createTable = db.prepare(`
                CREATE TABLE IF NOT EXISTS watchLists (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name VARCHAR NOT NULL,
					description VARCHAR DEFAULT NULL,
                    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                    totalCount INTEGER  DEFAULT 0
                );
            `);
		createTable.run();
	} catch (err) {
		console.log('Error while creating watchLists table', err);
		throw new Error(
			'Error while creating watchLists table.' + JSON.stringify({ err }),
		);
	}
	console.log('END: watchLists (if not exists)');
};

export const createWatchListItemTable = () => {
	console.log('START: Creating watchListItem table');
	try {
		const createTable = db.prepare(`
                CREATE TABLE IF NOT EXISTS watchListItem (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    watchListId INTEGER,
                    name VARCHAR NOT NULL,
                    description VARCHAR,
                    status VARCHAR,
                    type VARCHAR,
                    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (watchListId) REFERENCES watchLists(id)
                );
            `);
		createTable.run();
	} catch (err) {
		console.log('Error while creating watchListItem table', err);
		throw new Error(
			'Error while creating watchListItem table.' +
				JSON.stringify({ err }),
		);
	}
	console.log('END: Creating watchListItem table');
};

export const getWatchListsFromDB = (): any => {
	const query = db.prepare(`SELECT * FROM watchLists;`).all();
	return query;
};

export const getWatchListByIdFromDB = (watchListId: string): any => {
	const watchListData = db
		.prepare(`SELECT * FROM watchListItem WHERE watchListId = ?`)
		.all(watchListId);
	const watchListMetaData = db
		.prepare(`SELECT * FROM watchLists WHERE id = ?`)
		.all(watchListId);
	return { meta: watchListMetaData, data: watchListData };
};

export const createWatchListInDb = (
	listName: string,
	description: string = '',
): any => {
	try {
		const data = db
			.prepare(
				`
				INSERT INTO watchLists (name, description)
				VALUES (?,?)
			`,
			)
			.run(listName, description);
		return data;
	} catch (err) {
		console.log('Error while inserting data', JSON.stringify(err));
		throw new Error('Error while inserting data');
	}
};

export const addWatchlistItemToDB = (
	name: string,
	description: string,
	status: string,
	type: string,
	watchListId: string,
) => {
	try {
		const data = db
			.prepare(
				`
				INSERT INTO watchListItem (name, description, status, type, watchListId)
				VALUES (?,?,?,?,?)
			`,
			)
			.run(name, description, status, type, watchListId);
		return data;
	} catch (err) {
		console.log('[DB]: Error while inserting data', err);
		throw new Error('[DB] Error while inserting data');
	}
};

export const updateWatchListInDB = (
	watchListId: number,
	name: string,
	description: string,
) => {
	try {
		const data = db
			.prepare(
				`
				UPDATE watchLists
				SET
					name = COALESCE(?, name),
					description = COALESCE(?, description)
				WHERE
					id = ? 
			`,
			)
			.run(name, description, watchListId);
		return data;
	} catch (err) {
		console.log('[DB:] Error while updating list', err);
		throw new Error('[DB]: Error while updating list');
	}
};

export const updateWatchListItemInDB = (
	itemId: number,
	name: string,
	description: string,
	status: string,
	type: string,
) => {
	try {
		const data = db
			.prepare(
				`
				UPDATE watchListItem
				SET
					name = COALESCE(?, name),
					description = COALESCE(?, description),
					status = COALESCE(?, status),
					type = COALESCE(?, type)
				WHERE
					id = ? 
			`,
			)
			.run(name, description, status, type, itemId);
		return data;
	} catch (err) {
		console.log('[DB:] Error while updating item', err);
		throw new Error('[DB]: Error while updating item');
	}
};
