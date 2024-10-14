import { db } from '../db';
import { VideoDto } from '../dtos/video-dto';
import { IVideo } from '../types/video-types';
import { UpdateVideDto } from '../dtos/updateVideo-dto';

class VideoService {
  getAllVideos = () => {
    return db.videos;
  };

  createVideo = (data: VideoDto): IVideo => {
    let tomorrow = new Date();
    let newVideo = {
      ...data,
      'id': Number(new Date().getTime()),
      'canBeDownloaded': false,
      'minAgeRestriction': null,
      'createdAt': new Date().toISOString(),
      'publicationDate': new Date(tomorrow.setDate(tomorrow.getDate() + 1)).toISOString(),
    };
    db.videos.push(newVideo);
    return newVideo;
  };

  getVideo = (id: number): IVideo | undefined => {
    return db.videos.find((video => video.id === id));
  };

  deleteVideo = (id: number) => {
    const oldVideosLength = db.videos.length;
    db.videos = db.videos.filter((video) => video.id !== id);
    return db.videos.length === oldVideosLength - 1;
  };

  updateVideo = (id: number, data: UpdateVideDto) => {
    const index = db.videos.findIndex(video => video.id === id);
    db.videos[index] = { ...db.videos[index], ...data };
  };
}

export const videoService = new VideoService();