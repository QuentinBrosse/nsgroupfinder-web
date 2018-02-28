/* eslint-disable no-console */

export const inDevEnv = () => process.env.NODE_ENV === 'development';

export const logErrorIfDevEnv = (...err) => inDevEnv() && console.error(...err);

export const logInfoIfDevEnv = (...payload) =>
  inDevEnv() && console.info(...payload);
