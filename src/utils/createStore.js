import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { getFirebase, reactReduxFirebase } from 'react-redux-firebase';
import { reduxFirestore } from 'redux-firestore';
import { createEpicMiddleware } from 'redux-observable';
import makeRootReducer from 'reducers';
import makeRootEpic from 'epics';
import { credential, config } from 'config/firebase';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

export default initialState => {
  firebase.initializeApp(credential);

  firebase.firestore();

  const epicMiddleware = createEpicMiddleware(makeRootEpic(), {
    dependencies: { getFirebase },
  });

  const store = createStore(
    makeRootReducer(),
    initialState,
    composeWithDevTools(
      reactReduxFirebase(firebase, config),
      reduxFirestore(firebase),
      applyMiddleware(epicMiddleware)
    )
  );

  return store;
};
