import { IDb } from './types/video-types';

export const db: IDb = {
  videos: [],
};

export const setDb = (dataset?: IDb) => {
  if (!dataset) {
    db.videos = [];
    return;
  }

  db.videos = dataset.videos || db.videos;
};