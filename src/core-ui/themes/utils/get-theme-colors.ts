import {ColorType} from '../../types';

export const getBorderColor = (color: ColorType) => {
  let theme = '';

  switch (color) {
    case 'primary':
      theme = 'border-primary-400';
      break;
    case 'secondary':
      theme = 'border-secondary-400';
      break;
    case 'danger':
      theme = 'border-red-400';
      break;
    case 'warning':
      theme = 'border-amber-400';
      break;
    case 'success':
      theme = 'border-emerald-400';
      break;
    case 'info':
      theme = 'border-sky-400';
      break;
    case 'dark':
      theme = 'border-slate-700';
      break;
  }

  return theme;
};

export const getBackgroudColor = (color: ColorType) => {
  let theme = '';

  switch (color) {
    case 'primary':
      theme = 'bg-primary-400';
      break;
    case 'secondary':
      theme = 'bg-secondary-400';
      break;
    case 'danger':
      theme = 'bg-red-400';
      break;
    case 'warning':
      theme = 'bg-amber-400';
      break;
    case 'success':
      theme = 'bg-emerald-400';
      break;
    case 'info':
      theme = 'bg-sky-400';
      break;
    case 'dark':
      theme = 'bg-slate-700';
      break;
  }

  return theme;
};

export const getTextColor = (color: ColorType) => {
  let theme = '';

  switch (color) {
    case 'primary':
      theme = 'text-primary-400';
      break;
    case 'secondary':
      theme = 'text-secondary-400';
      break;
    case 'danger':
      theme = 'text-red-400';
      break;
    case 'warning':
      theme = 'text-amber-400';
      break;
    case 'success':
      theme = 'text-emerald-400';
      break;
    case 'info':
      theme = 'text-sky-400';
      break;
    case 'dark':
      theme = 'text-slate-700';
      break;
  }

  return theme;
};
