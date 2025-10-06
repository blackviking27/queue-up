import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { getPreloadPath, isDev } from './util.js';
import {
	ADD_TO_WATCH_LIST,
	CREATE_WATCH_LIST,
	GET_WATCH_LIST,
	GET_WATCH_LIST_BY_ID,
	REMOVE_FROM_WATCH_LIST,
	REMOVE_WATCH_LIST,
	SEARCH_WATCH_LIST,
	UPDATE_WATCH_LIST,
} from './utils/methods.js';
import {
	addToWatchList,
	createWatchList,
	getWatchListById,
	getWatchLists,
	removeFromWatchList,
	removeWatchList,
	searchWatchList,
	updateWatchList,
} from './utils/handlerFunctions.js';
import {
	createWatchListItemTable,
	createWatchLsitsTable,
} from './database/db.js';

// Starting the app window
app.on('ready', () => {
	// setting up db tables
	createWatchLsitsTable();
	createWatchListItemTable();

	const mainWindow = new BrowserWindow({
		title: 'Anime watchlist',
		webPreferences: {
			preload: getPreloadPath(),
		},
	});

	// Starting the server / app
	if (isDev()) {
		console.log('starting dev application...');
		mainWindow.loadURL('http://localhost:4444');
	} else {
		mainWindow.loadFile(
			path.join(app.getAppPath(), '/dist-react/index.html'),
		);
	}

	ipcMain.handle(GET_WATCH_LIST, async (_, params) => {
		return await getWatchLists();
	});

	ipcMain.handle(GET_WATCH_LIST_BY_ID, async (_, params) => {
		return await getWatchListById(params);
	});

	ipcMain.handle(SEARCH_WATCH_LIST, async (_, params) => {
		return await searchWatchList(params);
	});

	ipcMain.handle(CREATE_WATCH_LIST, async (_, params) => {
		return await createWatchList(params);
	});

	ipcMain.handle(ADD_TO_WATCH_LIST, async (_, params) => {
		return await addToWatchList(params);
	});

	ipcMain.handle(UPDATE_WATCH_LIST, async (_, params) => {
		return await updateWatchList(params);
	});

	ipcMain.handle(REMOVE_FROM_WATCH_LIST, async (_, params) => {
		return await removeFromWatchList(params);
	});

	ipcMain.handle(REMOVE_WATCH_LIST, async (_, params) => {
		return await removeWatchList(params);
	});
});
