import { WatchListItem } from "./utils/types";

const { contextBridge, ipcRenderer } = require("electron");
const { FETCH_ANIME_DETAIL, SEARCH_ANIME } = require("../utils/methods");

contextBridge.exposeInMainWorld("commands", {
  // fetchAnimeDetail: (animeId: string) =>
  //   ipcRendererInvoke(FETCH_ANIME_DETAIL, { animeId }),
  // searchAnime: (query: string) => ipcRendererInvoke(SEARCH_ANIME, { query }),
  // getWatchList: () => ipcRendererInvoke("getWatchList"),
  // addToWatchList: () => ipcRendererInvoke("addToWatchList"),
  // removeFromWatchList: (animeId: string) =>
  //   ipcRendererInvoke("removeFromWatchList", { animeId }),
  // updateWatchStatus: (animeId: string, status: string) =>
  //   ipcRendererInvoke("updateWatchStatus", {
  //     animeId,
  //     status,
  //   }),
  // getRecommendation: () => ipcRendererInvoke("getRecommendation"),
  // getPopularAnime: () => ipcRendererInvoke("getPopularAnime"),

  getWatchLists: () => ipcRendererInvoke("getWatchLists"),
  getWatchListById: (watchListId: string) =>
    ipcRendererInvoke("getWatchListById", { watchListId }),

  searchWatchList: (watchListName: string) =>
    ipcRendererInvoke("searchWatchList", { watchListName }),

  createWatchList: (watchListName: string) =>
    ipcRendererInvoke("createWatchList", { watchListName }),
  addToWatchList: (watchListId: string, itemDetails: WatchListItem) =>
    ipcRendererInvoke("addToWatchList", { watchListId, itemDetails }),

  updateWatchList: (watchListId: string, itemDetails: WatchListItem) =>
    ipcRendererInvoke("updateWatchList", { watchListId, itemDetails }),

  removeFromWatchList: (watchListId: string, itemId: string) =>
    ipcRendererInvoke("removeFromWatchList", { watchListId, itemId }),
  removeWatchList: (watchListId: string) =>
    ipcRendererInvoke("removeWatchList", { watchListId }),
});

const ipcRendererInvoke = (
  method: string,
  params: Record<string, unknown> = {}
) => {
  return ipcRenderer.invoke(method, params);
};
