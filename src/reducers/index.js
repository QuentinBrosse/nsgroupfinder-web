import { combineReducers } from 'redux';
import { firebaseStateReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import { reducer as formReducer } from 'redux-form';
import snackbar from './snackbar';
import groups from './groups';

const makeRootReducer = asyncReducers =>
  combineReducers({
    snackbar,
    groups,
    firebase: firebaseStateReducer,
    firestore: firestoreReducer,
    form: formReducer,
    ...asyncReducers,
  });

export default makeRootReducer;
