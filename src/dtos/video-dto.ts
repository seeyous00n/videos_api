import { IInputVideoData } from '../types/video-types';

export class VideoDto {
  title;
  author;
  availableResolutions;

  constructor(model: IInputVideoData) {
    this.title = model.title;
    this.author = model.author;
    this.availableResolutions = model.availableResolutions;
  }
}