import {cache} from 'react';
import {dehydrate, QueryClient} from '@tanstack/react-query';

const prefetchData = async (name: string[], callback: any) => {
  const queryClient = cache(() => new QueryClient())();
  const dehydratedState = dehydrate(queryClient);

  await queryClient.prefetchQuery(name, callback);

  return dehydratedState;
};

export {prefetchData};
