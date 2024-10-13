import { config } from 'dotenv';

config();

export const SETTINGS = {
  PORT: process.env.PORT || 3003,
  PATH: {
    VIDEOS: '/videos',
  },
};

export const ROUTER_PATHS = {
  VIDEOS: '/videos',
  TESTING: '/testing/all-data',
};

export const VALIDATION_OPTIONS = {
  title: {
    name: 'title',
    maxLength: 40,
  },
  author: {
    name: 'author',
    maxLength: 20,
  },
};

export const STATUS_CODE = {
  'OK_200': 200,
  'CREATED_201': 201,
  'NO_CONTENT_204': 204,
  'BAD_REQUEST_400': 400,
  'NOT_FOUND_404': 404,
  'SERVER_ERROR_500': 500,
};

export const HTTP_MESSAGE = {
  'BAD_REQUEST': 'Bad request',
  'ID_DOESNT_EXIST': `id doesn't exist`,
  'NOT_FOUND': 'Not Found',
  'SERVER_ERROR': 'Internal Server Error',
};