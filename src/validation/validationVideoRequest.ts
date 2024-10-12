import { IInputVideoData, ResolutionsEnum } from '../types/video-types';
import { VALIDATION_OPTIONS } from '../settings';

interface IInputErrors {
  message: string;
  field: string;
}

class ValidationVideoRequest {
  video: IInputVideoData;
  field: string;
  errors: IInputErrors[];

  constructor(data: IInputVideoData) {
    this.video = data;
    this.field = '';
    this.errors = [];
    this.validationTitle();
    this.validationAuthor();
    this.validationAvailableResolutions();
  }

  validationTitle() {
    this.field = VALIDATION_OPTIONS.title.name;
    this.validateTextField(this.video.title, VALIDATION_OPTIONS.title.maxLength);
  }

  validationAuthor() {
    this.field = VALIDATION_OPTIONS.author.name;
    this.validateTextField(this.video.author, VALIDATION_OPTIONS.author.maxLength);
  }

  validationAvailableResolutions() {
    this.field = 'availableResolutions';
    if (!Array.isArray(this.video.availableResolutions) || !this.video.availableResolutions.length) {
      this.errors.push({
        message: `No matching resolutions`, field: this.field,
      });
    }

    if (this.video.availableResolutions) {
      this.video.availableResolutions.forEach((v) => {
        if (!Object.keys(ResolutionsEnum).includes(v)) {
          this.errors.push({
            message: `Bad resolutions`, field: this.field,
          });
        }
      });
    }
  }

  private validateTextField(str: string, maxLength: number) {

    if (!str || str.trim().length === 0) {
      this.errors.push({
        message: `No ${this.field}`, field: this.field,
      });
    }

    if (str && str.length > maxLength) {
      this.errors.push({
        message: `More than ${maxLength} symbols`, field: this.field,
      });
    }
  }
}

export { ValidationVideoRequest };