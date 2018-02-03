import { combineEpics } from 'redux-observable';
// import 'rxjs';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/concat';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';
import groups from './groups';

const makeRootEpic = () => combineEpics(groups);

export default makeRootEpic;
