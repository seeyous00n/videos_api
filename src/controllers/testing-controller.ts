import { NextFunction, Request, Response } from 'express';
import { db } from '../db';
import { STATUS_CODE } from '../settings';

class TestController {
  deleteAllVideo = (req: Request, res: Response, next: NextFunction) => {
    try {
      db.videos = [];
      res.status(STATUS_CODE.NO_CONTENT).json('All data is deleted');
    } catch (e) {
      res.status(STATUS_CODE.BAD_REQUEST).json('Ups..');
    }
  };
}

export const testingController = new TestController();