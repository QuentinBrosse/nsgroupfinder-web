// @flow

import { combineEpics } from 'redux-observable';
import {
  fetchGroupsSuccess,
  fetchGroupsFailure,
  fetchCurrentGroupMembersSuccess,
  fetchCurrentGroupMembersFailure,
} from 'actions/groups';
import type {
  Group,
  FetchGroups,
  FetchCurrentGroupMembers,
  GroupsActions,
} from 'types/group';
import type { Member } from 'types/user';
import type { Store } from 'types/store';
import { logErrorIfDevEnv } from 'utils/env';
import { Observable } from 'rxjs';

const fetchGroup = (
  action$: Observable<GroupsActions>,
  store: Store,
  { getFirebase }: { getFirebase: Function }
): Observable<GroupsActions> =>
  action$.ofType('FETCH_GROUPS').mergeMap((action: FetchGroups) => {
    const { groupIds } = action.payload;
    const db = getFirebase().firestore();
    const groupRef = db.collection('groups');
    const snapshots$ = groupIds.map(groupId => groupRef.doc(groupId).get());

    return Observable.forkJoin(snapshots$)
      .map(snapshot => {
        const nonexistent = snapshot.findIndex(g => !g.exists) !== -1;
        if (nonexistent) {
          logErrorIfDevEnv(`Groups (${groupIds.join(', ')}) are nonexistent.`);
          return fetchGroupsFailure();
        }
        const groups: Group[] = snapshot.map(s => ({ id: s.id, ...s.data() }));
        return fetchGroupsSuccess(groups);
      })
      .catch(err => {
        logErrorIfDevEnv(err);
        return Observable.of(fetchGroupsFailure());
      });
  });

const fetchGroupMembers = (
  action$: Observable<GroupsActions>,
  store: Store,
  { getFirebase }: { getFirebase: Function }
): Observable<GroupsActions> =>
  action$
    .ofType('FETCH_CURRENT_GROUP_MEMBERS')
    .mergeMap((action: FetchCurrentGroupMembers) => {
      const { groupId } = action.payload;
      const db = getFirebase().firestore();
      const membersRef = db.collection('members');
      const snapshot$ = membersRef.where('groupId', '==', groupId).get();

      return Observable.fromPromise(snapshot$)
        .map(snapshot => {
          const members: Member[] = snapshot.docs.map(m => ({
            id: m.id,
            ...m.data(),
          }));
          return fetchCurrentGroupMembersSuccess(members);
        })
        .catch(err => {
          logErrorIfDevEnv(err);
          return Observable.of(fetchCurrentGroupMembersFailure());
        });
    });

export default combineEpics(fetchGroup, fetchGroupMembers);
