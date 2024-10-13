import { NextFunction, Request, Response } from 'express';
import { HTTP_MESSAGE, HTTP_STATUS_CODE } from '../settings';
import { setDb } from '../db';

class TestController {
  deleteAllVideo = (req: Request, res: Response, next: NextFunction) => {
    try {
      setDb();
      res.status(HTTP_STATUS_CODE.NO_CONTENT_204).json();
    } catch (e) {
      res.status(HTTP_STATUS_CODE.BAD_REQUEST_400).json(HTTP_MESSAGE.BAD_REQUEST);
    }
  };
}

export const testingController = new TestController();