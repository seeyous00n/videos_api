import { config } from 'dotenv';

config();

export const SETTINGS = {
  PORT: process.env.PORT || 3003,
  PATH: {
    VIDEOS: '/videos',
  },
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