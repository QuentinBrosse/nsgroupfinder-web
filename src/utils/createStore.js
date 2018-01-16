import { compose, createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase } from 'react-redux-firebase';
import { reduxFirestore } from 'redux-firestore';
import { createLogger } from 'redux-logger';
import makeRootReducer from 'reducers';
import { credential, config } from 'config/firebase';
import reduxLoggerConfig from 'config/reduxLogger';

export default initialState => {
  firebase.initializeApp(credential);

  firebase.firestore();

  const logger = createLogger(reduxLoggerConfig);

  const store = createStore(
    makeRootReducer(),
    initialState,
    compose(
      reactReduxFirebase(firebase, config),
      reduxFirestore(firebase),
      applyMiddleware(logger)
    )
  );

  return store;
};
