'use client';
import {FC} from 'react';
import {useSession} from 'next-auth/react';

import {IComponentBaseProps} from '@/common/interfaces/component.interface';

import {GlobalConnectSocket} from '../sockets/global-connect.socket';
import useCommonListener from '../sockets/use-socket-lister';

type InitSocketProps = IComponentBaseProps;

const InitSocket: FC<InitSocketProps> = () => {
  const session = useSession();
  useCommonListener({session: session.data!, socket: GlobalConnectSocket});

  return null;
};

export default InitSocket;
