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
  'OK': 200,
  'CREATED': 201,
  'NO_CONTENT': 204,
  'BAD_REQUEST': 400,
  'NOT_FOUND': 404,
  'SERVER_ERROR': 500,
};