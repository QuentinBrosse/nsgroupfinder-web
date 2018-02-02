import { combineEpics } from 'redux-observable';
import 'rxjs';
import groups from './groups';

const makeRootEpic = () => combineEpics(groups);

export default makeRootEpic;
