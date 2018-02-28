// @flow

// Serice
export type MethodName = 'GET' | 'POST' | 'HEAD' | 'PUT' | 'DELETE' | 'OPTIONS';

export type FetchRequest = {
  endPoint: string,
  method?: MethodName,
  payload?: Object,
  extraHeaders?: Object,
};

export type FetchError = {
  data: null,
  error: Error,
};

export type FetchSuccess = {
  data: Object | Array<*>,
  error: null,
};

export type FetchResponse = FetchSuccess | FetchError;

export type FetchProp = {
  started: boolean,
  data: any,
  error: null | Error,
  startRequest: FetchRequest => any,
  finished: boolean,
};
