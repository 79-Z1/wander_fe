export interface IMediaAttribute {
  id: string;
  name: string;
  alt: string;
  url: string;
  isTemp: boolean;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  createdAt: string;
  updatedAt: string;
}

export interface IPresignedResponse {
  url: string;
  file: IMediaAttribute;
  fields: {
    key: string;
    [key: string]: string;
  };
}
