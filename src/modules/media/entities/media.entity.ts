export type MediaEntity = {
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
};

export interface IPresignedResponse {
  url: string;
  fields: {
    key: string;
    [key: string]: string;
  };
  file: MediaEntity;
}
