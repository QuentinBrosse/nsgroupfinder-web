// @flow

import { fetchGroupSuccess, fetchGroupFailure } from 'actions/groups';
import type { FetchGroups, GroupsActions } from 'types/group';
import type { Store } from 'types/store';
import { logErrorIfDevEnv } from 'utils/env';
import { Observable } from 'rxjs';

export default (
  action$: Observable<GroupsActions>,
  store: Store,
  { getFirebase }: { getFirebase: Function }
): Observable<GroupsActions> =>
  action$.ofType('GROUPS_FETCH').mergeMap((action: FetchGroups) => {
    const { groupId } = action.payload;
    const db = getFirebase().firestore();
    const groupRef = db.collection('groups');
    const groupPromise = groupRef.doc(groupId).get();

    return Observable.fromPromise(groupPromise)
      .map(snapshot => {
        if (snapshot.exists) {
          const group = { id: snapshot.id, ...snapshot.data() };
          return fetchGroupSuccess(group);
        }
        logErrorIfDevEnv(`Unable to fetch ${groupId} group.`);
        return fetchGroupFailure(groupId);
      })
      .catch(err => {
        logErrorIfDevEnv(err);
        return Observable.of(fetchGroupFailure(groupId));
      });
  });
