import {IPaging} from './api-response.interface';

export interface IInitState {
  isLogging?: boolean;
  isFetching?: boolean;
  isCreating?: boolean;
  isReading?: boolean;
  isUpdating?: boolean;
  isDeleting?: boolean;
  message?: string | string[];
  statusCode?: number;
  error?: unknown;
  meta?: {
    paging?: IPaging;
  };
}
