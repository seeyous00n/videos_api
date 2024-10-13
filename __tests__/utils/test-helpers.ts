import { app } from '../src/app';
import { agent } from 'supertest';
import { IInputVideoData, ResolutionsEnum } from '../src/types/video-types';

export const req = agent(app);

export const mokDataCreateVideo: IInputVideoData = {
  'title': '99',
  'author': 'asd',
  'availableResolutions': [
    ResolutionsEnum.P1440,
  ],
};

export const mokBadDataCreateVideo = {
  'title': '',
  'author': 'asd',
  'availableResolutions': [
    ResolutionsEnum.P1440,
  ],
};
