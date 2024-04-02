export const generateQueryParams = (params: Record<string | number, string | number | undefined>) => {
  const paramsArray: string[] = [];

  Object.keys(params).map(key => {
    if (params[key]) paramsArray.push(`${key}=${params[key]}`);
  });

  return paramsArray.join('&');
};
