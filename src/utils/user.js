// @flow
import { isLoaded, isEmpty } from 'react-redux-firebase';
import type { FirebaseUserOpti, Member } from 'types/user';

/* eslint-disable import/prefer-default-export */

export const isConnected = (auth: Object): boolean =>
  isLoaded(auth) && !isEmpty(auth) && !auth.isAnonymous;

export const getUserFromAuth = (
  auth: Object,
  profile: Member
): FirebaseUserOpti => ({
  uid: auth.uid,
  displayName: profile.displayName,
  email: profile.email,
  avatarUrl: profile.avatarUrl,
  facebookLink: profile.facebookLink,
});
