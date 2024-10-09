import { ValidationVideoRequest } from './validationVideoRequest';
import { IUpdateVideo } from '../types/video-types';

const MAX_AGE = 18;
const MIN_AGE = 1;

class ValidationUpdateVideoRequest extends ValidationVideoRequest {
  canBeDownloaded: boolean;
  minAgeRestriction: null | number;
  publicationDate: string;

  constructor(data: IUpdateVideo) {
    super(data);
    this.canBeDownloaded = data.canBeDownloaded;
    this.minAgeRestriction = data.minAgeRestriction;
    this.publicationDate = data.publicationDate;
    this.validationCanBeDownloaded();
    this.validationMinAgeRestriction();
    this.validationPublicationDate();
  }

  validationCanBeDownloaded() {
    if (typeof this.canBeDownloaded !== 'boolean') {
      this.errors.push({
        message: `bad`, field: 'canBeDownloaded',
      });
    }
  }

  validationMinAgeRestriction() {
    if (!this.minAgeRestriction) {
      this.errors.push({
        message: `bad`, field: 'minAgeRestriction',
      });
    } else if (this.minAgeRestriction && (this.minAgeRestriction < MIN_AGE || this.minAgeRestriction > MAX_AGE)) {
      this.errors.push({
        message: `bad`, field: 'minAgeRestriction',
      });
    }
  }

  validationPublicationDate() {
    if (!this.publicationDate || new Date(Date.parse(this.publicationDate)).toISOString() !== this.publicationDate) {
      this.errors.push({
        message: `bad`, field: 'publicationDate',
      });
    }
  }
}

export { ValidationUpdateVideoRequest };