import { NextFunction, Request, Response } from 'express';
import { STATUS_CODE } from '../settings';
import { setDb } from '../db';

class TestController {
  deleteAllVideo = (req: Request, res: Response, next: NextFunction) => {
    try {
      setDb();
      res.status(STATUS_CODE.NO_CONTENT_204).json('All data is deleted');
    } catch (e) {
      res.status(STATUS_CODE.BAD_REQUEST_400).json('Ups..');
    }
  };
}

export const testingController = new TestController();