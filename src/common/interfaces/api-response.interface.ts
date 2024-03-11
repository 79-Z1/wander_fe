export interface IPaging {
  page: number;
  perPage: number;
  totalItem: number;
  totalPage: number;
}

export interface IMeta {
  paging: IPaging;
}

export interface IResponseFormat<T> {
  message?: string | string[];
  statusCode?: number;
  error?: string;
  metadata: T;
}

export interface IResponseError {
  response: {
    data: {
      statusCode: number;
      message: string;
      error: string;
    };
  };
  status: number;
}
