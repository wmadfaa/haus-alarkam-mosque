import moment from 'moment';

export function isDateInThePast(val: string) {
  const now = moment();
  const date = moment(val);
  if (now.isAfter(date)) {
    return true;
  }
  return false;
}
