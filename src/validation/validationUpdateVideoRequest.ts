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
    this.checkDownloaded();
    this.checkMinAge();
    this.checkDate();
  }

  checkDownloaded() {
    if (!this.canBeDownloaded || typeof this.canBeDownloaded !== 'boolean') {
      this.errors.push({
        message: `bad`, field: '',
      });
    }
  }

  checkMinAge() {
    if (!this.minAgeRestriction) {
      this.errors.push({
        message: `bad`, field: '',
      });
    } else if (this.minAgeRestriction && (this.minAgeRestriction < MIN_AGE || this.minAgeRestriction > MAX_AGE)) {
      this.errors.push({
        message: `bad`, field: '',
      });
    }
  }

  checkDate() {
    if (!this.publicationDate || !Date.parse(this.publicationDate)) {
      this.errors.push({
        message: `bad`, field: '',
      });
    }
  }
}

export { ValidationUpdateVideoRequest };