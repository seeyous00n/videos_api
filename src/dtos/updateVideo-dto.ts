import { IInputUpdateVideoData } from '../types/video-types';
import { VideoDto } from './video-dto';

export class UpdateVideDto extends VideoDto {
  canBeDownloaded;
  minAgeRestriction;
  publicationDate;

  constructor(model: IInputUpdateVideoData) {
    super(model);
    this.canBeDownloaded = model.canBeDownloaded;
    this.minAgeRestriction = model.minAgeRestriction;
    this.publicationDate = model.publicationDate;
  }
}