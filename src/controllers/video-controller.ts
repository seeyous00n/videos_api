import { NextFunction, Request, Response } from 'express';
import { videoService } from '../services/video-service';
import { ValidationVideoRequest } from '../validation/validationVideoRequest';
import { VideoDto } from '../dtos/video-dto';
import { UpdateVideDto } from '../dtos/updateVideo-dto';
import { ValidationUpdateVideoRequest } from '../validation/validationUpdateVideoRequest';
import { STATUS_CODE } from '../settings';

class VideoController {
  getVideos = (req: Request, res: Response, next: NextFunction) => {
    const result = videoService.getAllVideos();
    res.status(STATUS_CODE.OK).json(result);
  };

  getVideo = (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.params.id) {
        res.status(STATUS_CODE.NO_CONTENT).json('id doesn\'t exist');
        return;
      }
      const video = videoService.getVideo(+req.params.id);
      if (!video) {
        res.status(STATUS_CODE.NO_CONTENT).json('id doesn\'t exist');
        return;
      }
      res.status(STATUS_CODE.OK).json(video);
    } catch (error) {
      res.status(STATUS_CODE.SERVER_ERROR).json('Ups..');
    }
  };

  createVideo = (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = new ValidationVideoRequest(req.body);
      if (errors.errors.length > 0) {
        res.status(STATUS_CODE.BAD_REQUEST).json(errors.errors);
        return;
      }
      const videoDto = new VideoDto(req.body);
      const newVideo = videoService.createVideo(videoDto);
      res.status(STATUS_CODE.CREATED).json(newVideo);
    } catch (error) {
      res.status(STATUS_CODE.SERVER_ERROR).json('Ups..');
    }
  };

  updateVideo = (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.params.id) {
        res.status(STATUS_CODE.NOT_FOUND).json('Not Found');
        return;
      }

      const errors = new ValidationUpdateVideoRequest(req.body);

      if (errors.errors.length > 0) {
        res.status(STATUS_CODE.BAD_REQUEST).json('InputModel has incorrect values err');
        return;
      }

      const dataVideo = new UpdateVideDto(req.body);
      videoService.updateVideo(+req.params.id, dataVideo);
      res.status(STATUS_CODE.NO_CONTENT).json();
    } catch (error) {
      res.status(STATUS_CODE.SERVER_ERROR).json('Ups..');
    }
  };

  deleteVideo = (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.params.id) {
        res.status(STATUS_CODE.NOT_FOUND).json('Not Found');
        return;
      }
      const result = videoService.deleteVideo(+req.params.id);

      if (!result) {
        res.status(STATUS_CODE.NOT_FOUND).json('Not Found');
        return;
      }
      res.status(STATUS_CODE.NO_CONTENT).json();
    } catch (e) {
      res.status(STATUS_CODE.SERVER_ERROR).json('Ups..');
    }
  };
}

export const videoController = new VideoController();