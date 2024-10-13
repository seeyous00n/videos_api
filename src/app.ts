import express, { NextFunction, Request, Response } from 'express';
import { videoRouter } from './routers/video-router';
import { testingController } from './controllers/testing-controller';
import { HTTP_MESSAGE, ROUTER_PATHS, STATUS_CODE } from './settings';

export const app = express();

app.use(express.json());
app.use(ROUTER_PATHS.VIDEOS, videoRouter);
app.delete(ROUTER_PATHS.TESTING, testingController.deleteAllVideo);
app.use('*', (req: Request, res: Response, next: NextFunction) => {
  res.status(STATUS_CODE.BAD_REQUEST_400).json(HTTP_MESSAGE.NOT_FOUND);
});

