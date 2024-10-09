import express, { NextFunction, Request, Response } from 'express';
import { videoRouter } from './routers/video-router';
import { testingController } from './controllers/testing-controller';

export const app = express();

app.use(express.json());
app.use('/videos', videoRouter);
app.delete('/testing/all-data', testingController.deleteAllVideo);
app.use('*', (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json('Not Found');
});

