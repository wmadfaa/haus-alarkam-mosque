import merge from 'lodash.merge';

export const mergeState = <T extends object>(
  object: T,
  source: Partial<T>,
): T => merge({}, object, source);
