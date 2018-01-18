import { combineReducers } from 'redux';
import { firebaseStateReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import snackbar from './snackbar';

const makeRootReducer = asyncReducers =>
  combineReducers({
    snackbar,
    firebase: firebaseStateReducer,
    firestore: firestoreReducer,
    ...asyncReducers,
  });

export default makeRootReducer;
