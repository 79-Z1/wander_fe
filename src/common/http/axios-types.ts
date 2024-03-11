interface IError {
  status: number;
  name: string;
  message: string;
}

interface IMeta {
  [k: string]: any;
}

export interface IAxiosResponse<T> {
  data: T;
  meta: IMeta;
  error: IError;
}
