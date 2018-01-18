// @flow
import { isLoaded, isEmpty } from 'react-redux-firebase';

/* eslint-disable import/prefer-default-export */

export const isConnected = (auth: Object) =>
  isLoaded(auth) && !isEmpty(auth) && !auth.isAnonymous;
