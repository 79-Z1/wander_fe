import {AxiosRequestConfig} from 'axios';

import {IResponseFormat} from '../interfaces';

import axiosClient from './axios-client';

export async function get<T>(url: string, options?: AxiosRequestConfig) {
  return (await axiosClient.get<IResponseFormat<T>>(url, options)).data;
}

export async function post<T>(url: string, data: unknown, options?: AxiosRequestConfig) {
  return (await axiosClient.post<IResponseFormat<T>>(url, data, options)).data;
}

export async function put<T>(id: unknown, data: unknown, options?: AxiosRequestConfig) {
  return (await axiosClient.put<IResponseFormat<T>>(String(id), data, options)).data;
}

export async function patch<T>(id: unknown, data: unknown, options?: AxiosRequestConfig) {
  return (await axiosClient.patch<IResponseFormat<T>>(String(id), data, options)).data;
}

export async function destroy<T>(id: unknown, options?: AxiosRequestConfig) {
  return (await axiosClient.delete<IResponseFormat<T>>(String(id), options)).data;
}

export const HttpRequest = {get, post, patch, put, destroy};

export default HttpRequest;
