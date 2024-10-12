import { ValidationVideoRequest } from './validationVideoRequest';
import { IInputUpdateVideo } from '../types/video-types';

const MAX_AGE = 18;
const MIN_AGE = 1;

class ValidationUpdateVideoRequest extends ValidationVideoRequest {
  video: IInputUpdateVideo;

  constructor(data: IInputUpdateVideo) {
    super(data);
    this.video = data;
    this.validationCanBeDownloaded();
    this.validationMinAgeRestriction();
    this.validationPublicationDate();
  }

  validationCanBeDownloaded() {
    if (typeof this.video.canBeDownloaded !== 'boolean') {
      this.errors.push({
        message: `bad`, field: 'canBeDownloaded',
      });
    }
  }

  validationMinAgeRestriction() {
    if (!this.video.minAgeRestriction && this.video.minAgeRestriction !== null) {
      this.errors.push({
        message: `bad`, field: 'minAgeRestriction',
      });
    } else if (this.video.minAgeRestriction && (this.video.minAgeRestriction < MIN_AGE || this.video.minAgeRestriction > MAX_AGE)) {
      this.errors.push({
        message: `bad`, field: 'minAgeRestriction',
      });
    }
  }

  validationPublicationDate() {
    if (!this.video.publicationDate || new Date(Date.parse(this.video.publicationDate)).toISOString() !== this.video.publicationDate) {
      this.errors.push({
        message: `bad`, field: 'publicationDate',
      });
    }
  }
}

export { ValidationUpdateVideoRequest };