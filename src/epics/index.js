import { combineEpics } from 'redux-observable';
import 'rxjs';
import test from './test';

const makeRootEpic = () => combineEpics(test);

export default makeRootEpic;
