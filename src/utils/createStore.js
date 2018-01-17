import { compose, createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { getFirebase, reactReduxFirebase } from 'react-redux-firebase';
import { reduxFirestore } from 'redux-firestore';
import { createLogger } from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import makeRootReducer from 'reducers';
import makeRootEpic from 'epics';
import { credential, config } from 'config/firebase';
import reduxLoggerConfig from 'config/reduxLogger';

export default initialState => {
  firebase.initializeApp(credential);

  firebase.firestore();

  const loggerMiddleware = createLogger(reduxLoggerConfig);

  const epicMiddleware = createEpicMiddleware(makeRootEpic(), {
    dependencies: { getFirebase },
  });

  const store = createStore(
    makeRootReducer(),
    initialState,
    compose(
      reactReduxFirebase(firebase, config),
      reduxFirestore(firebase),
      applyMiddleware(loggerMiddleware),
      applyMiddleware(epicMiddleware)
    )
  );

  return store;
};
