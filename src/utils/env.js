export const inDevEnv = () => process.env.NODE_ENV === 'development';

export const logErrorIfDevEnv = err => inDevEnv() && console.error(err);
