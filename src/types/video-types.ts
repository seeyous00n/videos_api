export interface IDb {
  videos: IVideo[];
}

export enum ResolutionsEnum {
  'P144' = 'P144',
  'P240' = 'P240',
  'P360' = 'P360',
  'P480' = 'P480',
  'P720' = 'P720',
  'P1080' = 'P1080',
  'P1440' = 'P1440',
  'P2160' = 'P2160',
}

export interface IVideo {
  'id': number,
  'title': string,
  'author': string,
  'canBeDownloaded': boolean,
  'minAgeRestriction': null | number,
  'createdAt': string,
  'publicationDate': string,
  'availableResolutions': ResolutionsEnum[]
}

export interface IInputVideoData {
  'title': string,
  'author': string,
  'availableResolutions': ResolutionsEnum[]
}

export interface IInputUpdateVideoData extends IInputVideoData {
  'canBeDownloaded': boolean;
  'minAgeRestriction': null | number;
  'publicationDate': string;
}