import { combineReducers } from 'redux';
import { firebaseStateReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

const makeRootReducer = asyncReducers =>
  combineReducers({
    // Add sync reducers here
    firebase: firebaseStateReducer,
    firestore: firestoreReducer,
    ...asyncReducers,
  });

export default makeRootReducer;
