import { app } from '../src/app';
import { agent } from 'supertest';

export const req = agent(app);

export const mokDataCreate = {
  'title': '99',
  'author': 'asd',
  'availableResolutions': [
    'P144',
  ],
};

export const mokBadDataCreate = {
  'title': '',
  'author': 'asd',
  'availableResolutions': [
    'P144',
  ],
};
