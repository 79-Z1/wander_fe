import {formatDistance, formatRelative} from 'date-fns';
import {enUS, vi} from 'date-fns/locale';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isBetween from 'dayjs/plugin/isBetween';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

const WEEKDAYS_LONG = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
const WEEKDAYS_SHORT = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isBetween);
dayjs.extend(relativeTime);

export function setDayJsLocale(locale: string) {
  dayjs.locale(locale);
}

export function dateParse(date: string) {
  return dayjs(date, 'DD/MM/YYYY').toDate();
}

export function getDayName(date: string, weekday: 'long' | 'short' = 'short') {
  const day = dateParse(date).getDay();

  return weekday === 'long' ? WEEKDAYS_LONG[day] : WEEKDAYS_SHORT[day];
}

export function getDaysBetweenTwoDates(from?: string, to?: string): number {
  if (!from || !to) return 0;

  const dateFrom = dayjs(from, 'DD/MM/YYYY');
  const dateTo = dayjs(to, 'DD/MM/YYYY');

  return dateFrom.diff(dateTo, 'day') + 1;
}

export function getDayNameNative(date = new Date(), locale = 'vi-VN') {
  return date.toLocaleDateString(locale, {weekday: 'short'});
}

export function getFormatDistance(date: Date, addSuffix = false, locale = 'en-us') {
  let currentLocale = enUS;

  switch (locale) {
    case 'vi-vn':
      currentLocale = vi;
      break;
    default:
      currentLocale = enUS;
  }

  return formatDistance(date, new Date(), {addSuffix, locale: currentLocale});
}

export function getFormatRelative(date: Date, locale = 'en-us') {
  let currentLocale = enUS;

  switch (locale) {
    case 'vi-vn':
      currentLocale = vi;
      break;
    default:
      currentLocale = enUS;
  }

  return formatRelative(date, new Date(), {locale: currentLocale});
}
