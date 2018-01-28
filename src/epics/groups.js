// @flow

import { fetchGroupsSuccess, fetchGroupsFailure } from 'actions/groups';
import { FetchGroups } from 'types/group';
import { logErrorIfDevEnv } from 'utils/env';
import { Observable } from 'rxjs';

export default (action$, store, { getFirebase }) =>
  action$.ofType('GROUPS_FETCH').mergeMap((action: FetchGroups) => {
    const db = getFirebase().firestore();
    const groupRef = db.collection('groups');
    const { groupId } = action.payload;

    const groupPromise = groupRef.doc(groupId).get();

    return Observable.fromPromise(groupPromise)
      .map(snapshot => {
        if (snapshot.exists) {
          const group = { id: snapshot.id, ...snapshot.data() };
          return fetchGroupsSuccess(group);
        }
        logErrorIfDevEnv(`Unable to fetch ${groupId} group.`);
        return fetchGroupsFailure(groupId);
      })
      .catch(err => {
        logErrorIfDevEnv(err);
        return Observable.of(fetchGroupsFailure(groupId));
      });
  });
