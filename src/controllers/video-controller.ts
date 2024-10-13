import { NextFunction, Request, Response } from 'express';
import { videoService } from '../services/video-service';
import { ValidationVideoRequest } from '../validation/validationVideoRequest';
import { VideoDto } from '../dtos/video-dto';
import { UpdateVideDto } from '../dtos/updateVideo-dto';
import { ValidationUpdateVideoRequest } from '../validation/validationUpdateVideoRequest';
import { HTTP_MESSAGE, HTTP_STATUS_CODE } from '../settings';

class VideoController {
  getVideos = (req: Request, res: Response, next: NextFunction) => {
    const result = videoService.getAllVideos();
    res.status(HTTP_STATUS_CODE.OK_200).json(result);
  };

  getVideo = (req: Request, res: Response, next: NextFunction) => {
    try {
      const video = videoService.getVideo(+req.params.id);
      if (!video) {
        res.status(HTTP_STATUS_CODE.NOT_FOUND_404).json(HTTP_MESSAGE.ID_DOESNT_EXIST);
        return;
      }
      res.status(HTTP_STATUS_CODE.OK_200).json(video);
    } catch (error) {
      res.status(HTTP_STATUS_CODE.SERVER_ERROR_500).json(HTTP_MESSAGE.SERVER_ERROR);
    }
  };

  createVideo = (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = new ValidationVideoRequest(req.body);
      if (errors.errors.length > 0) {
        res.status(HTTP_STATUS_CODE.BAD_REQUEST_400).json({ errorsMessages: errors.errors });
        return;
      }
      const videoDto = new VideoDto(req.body);
      const newVideo = videoService.createVideo(videoDto);
      res.status(HTTP_STATUS_CODE.CREATED_201).json(newVideo);
    } catch (error) {
      res.status(HTTP_STATUS_CODE.SERVER_ERROR_500).json(HTTP_MESSAGE.SERVER_ERROR);
    }
  };

  updateVideo = (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.params.id || !videoService.getVideo(+req.params.id)) {
        res.status(HTTP_STATUS_CODE.NOT_FOUND_404).json(HTTP_MESSAGE.NOT_FOUND);
        return;
      }

      const errors = new ValidationUpdateVideoRequest(req.body);

      if (errors.errors.length > 0) {
        res.status(HTTP_STATUS_CODE.BAD_REQUEST_400).json({ errorsMessages: errors.errors });
        return;
      }

      const dataVideo = new UpdateVideDto(req.body);
      videoService.updateVideo(+req.params.id, dataVideo);
      res.status(HTTP_STATUS_CODE.NO_CONTENT_204).json();
    } catch (error) {
      res.status(HTTP_STATUS_CODE.SERVER_ERROR_500).json(HTTP_MESSAGE.SERVER_ERROR);
    }
  };

  deleteVideo = (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.params.id) {
        res.status(HTTP_STATUS_CODE.NOT_FOUND_404).json(HTTP_MESSAGE.NOT_FOUND);
        return;
      }
      const result = videoService.deleteVideo(+req.params.id);

      if (!result) {
        res.status(HTTP_STATUS_CODE.NOT_FOUND_404).json(HTTP_MESSAGE.NOT_FOUND);
        return;
      }
      res.status(HTTP_STATUS_CODE.NO_CONTENT_204).json();
    } catch (e) {
      res.status(HTTP_STATUS_CODE.SERVER_ERROR_500).json(HTTP_MESSAGE.SERVER_ERROR);
    }
  };
}

export const videoController = new VideoController();