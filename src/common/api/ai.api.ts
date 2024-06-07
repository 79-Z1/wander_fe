import {ILocation} from '../entities';
import HttpRequest from '../http/http-request';

const getAISuggestion = async (location: ILocation) => {
  return await HttpRequest.post<string>(`gemini/suggestion`, {
    location
  });
};

export const AIApi = {getAISuggestion};

export default AIApi;
