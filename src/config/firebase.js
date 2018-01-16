import { inDevEnv } from 'utils/env';

export const credential = {
  projectId: 'nsgroupfinder',
  apiKey: 'AIzaSyDNV6_r9aPciZLAI2BxEnONZMeLx40cIOQ',
  authDomain: 'nsgroupfinder.firebaseapp.com',
  databaseURL: 'https://nsgroupfinder.firebaseio.com/',
  storageBucket: 'nsgroupfinder.appspot.com',
  messagingSenderId: null,
};

export const config = {
  userProfile: 'users',
  useFirestoreForProfile: true,
  enableLogging: inDevEnv(),
};
