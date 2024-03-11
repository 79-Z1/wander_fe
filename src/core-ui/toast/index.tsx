'use client';

import {useEffect, useRef} from 'react';

import Toast, {IToast, IToastItem} from './toast';

const LIFE_TIME = 3000;

const useToast = () => {
  const toastRef = useRef<IToast>();

  const show = ({type = 'info', title, content, icon, lifeTime = LIFE_TIME}: IToastItem) => {
    toastRef.current?.show({type, title, content, icon, lifeTime});
  };

  const error = ({type = 'danger', title, content, icon, lifeTime = LIFE_TIME}: IToastItem) => {
    show({type, title, content, icon, lifeTime});
  };

  const success = ({type = 'success', title, content, icon, lifeTime = LIFE_TIME}: IToastItem) => {
    show({type, title, content, icon, lifeTime});
  };

  const info = ({type = 'info', title, content, icon, lifeTime = LIFE_TIME}: IToastItem) => {
    show({type, title, content, icon, lifeTime});
  };

  const warning = ({type = 'warning', title, content, icon, lifeTime = LIFE_TIME}: IToastItem) => {
    show({type, title, content, icon, lifeTime});
  };

  useEffect(() => {
    toastRef.current = Toast.getInstance();
  }, []);

  return {show, error, success, info, warning};
};

export default useToast;
