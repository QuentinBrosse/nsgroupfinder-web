// @flow
import { isLoaded, isEmpty } from 'react-redux-firebase';
import type { FirebaseUserObject } from 'types/user';

/* eslint-disable import/prefer-default-export */

export const isConnected = (auth: Object): boolean =>
  isLoaded(auth) && !isEmpty(auth) && !auth.isAnonymous;

export const getUserFromAuth = (auth: Object): FirebaseUserObject => ({
  avatarUrl: auth.photoURL,
  displayName: auth.displayName,
  email: auth.email,
  uid: auth.uid,
});
