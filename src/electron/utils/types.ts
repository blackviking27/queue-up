declare enum CONTENT_TYPES {
  anime = "anime",
  manga = "manga",
  movie = "movie",
  series = "series",
}

export type WatchListItem = {
  name: string;
  description: string;
  img?: string;
  status: string;
  type: CONTENT_TYPES;
};
