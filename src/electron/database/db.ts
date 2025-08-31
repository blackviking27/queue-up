import Database from 'better-sqlite3';

const db = new Database('app.db');

export const createTableIfNotExist = (tableName: string) => {
	const createTable = db.prepare(`
            CREATE TABLE IF NOT EXISTS ${tableName} (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name VARCHAR NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            );
        `);
	createTable.run();
};

// Creating the watchList table
// createTableIfNotExist('watchList');

// Create the watchListItem table
// createTableIfNotExist('watchListItem');
