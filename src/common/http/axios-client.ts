import {getSession} from 'next-auth/react';
import Axios, {AxiosError, AxiosResponse, InternalAxiosRequestConfig} from 'axios';

const axiosClient = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + '/api',
  timeout: 30000,
  headers: {'Content-Type': 'application/json'}
});

export async function getToken() {
  const session = await getSession();

  const accessToken = session?.user.accessToken;
  const refreshToken = session?.user.refreshToken;
  const userId = session?.user.id;

  return {accessToken, refreshToken, userId};
}

const onRequest = async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
  const headers = config.headers;
  const {accessToken, userId} = await getToken();

  if (accessToken) {
    headers.authorization = accessToken;
    headers['x-client-id'] = userId;
  }

  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  if (Number(error.response?.status) === 401) {
    // signOut();
  }
  return Promise.reject(error);
};

axiosClient.interceptors.request.use(onRequest, onRequestError);
axiosClient.interceptors.response.use(onResponse, onResponseError);

export default axiosClient;
