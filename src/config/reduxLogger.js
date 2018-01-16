import { inDevEnv } from 'utils/env';

const isDebuggingInChrome = inDevEnv() && !!window.navigator.userAgent;

export default {
  predicate: () => isDebuggingInChrome,
  collapsed: true,
  duration: true,
};
