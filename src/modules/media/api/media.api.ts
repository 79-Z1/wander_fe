import Axios from 'axios';

import {IPresignedResponse, MediaEntity} from '@/modules/media/entities/media.entity';

import {API_ENDPOINTS} from '@/common/constants/api-endpoint.constant';

import * as HttpRequest from '@/common/http/http-request';

const getPresignedUrl = (fileName: string) => {
  return HttpRequest.post<IPresignedResponse>(`${API_ENDPOINTS.MEDIA}/post-presigned`, {fileName});
};

const uploadToS3 = (presignedUrl: string, formData: FormData) => {
  return Axios.post(presignedUrl, formData);
};

const read = (id: string) => {
  return HttpRequest.get<MediaEntity>(`${API_ENDPOINTS.MEDIA}/${id}`);
};

export {getPresignedUrl, read, uploadToS3};
