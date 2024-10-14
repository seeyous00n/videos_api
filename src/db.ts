import { IDb } from './types/video-types';

export const db: IDb = {
  videos: [],
};

export const clearDb = () => db.videos = [];