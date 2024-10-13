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
    let isDelete = false;
    db.videos.forEach((video, i) => {
      if (video.id === id) {
        db.videos.splice(i, 1);
        isDelete = true;
      }
    });
    return isDelete;
  };

  updateVideo = (id: number, data: UpdateVideDto) => {
    db.videos.forEach((video, index) => {
      if (video.id === id) {
        //Object.assign(db.videos[index], data);
        db.videos[index] = { ...video, ...data };
      }
    });
  };
}

export const videoService = new VideoService();