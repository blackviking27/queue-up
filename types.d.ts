interface Window {
  commands: {
    fetchAnimeDetail: () => unknown;
    searchAnime: () => unknown;
    getWatchList: () => unknown;
    addToWatchList: () => void;
    removeFromWatchList: (animeId: string) => unknown;
    updateWatchStatus: (animeId: string, status: string) => unknown;
    getRecommendation: () => unknown;
    getPopularAnime: () => unknown;
  };
}
