// @flow

import { combineEpics } from 'redux-observable';
import {
  fetchGroupsSuccess,
  fetchGroupsFailure,
  fetchCurrentGroupMembersSuccess,
  fetchCurrentGroupMembersFailure,
  updateMemberStatusSuccess,
  updateGroupLocally,
  updateMemberLocally,
} from 'actions/groups';
import { throwAccentSnackbar, throwDissmissSnackbar } from 'actions/snackbar';
import type {
  Group,
  FetchGroups,
  FetchCurrentGroupMembers,
  UpdateMemberStatus,
  UpdateGroup,
  GroupsActions,
  UpdateMember,
} from 'types/group';
import type { Member } from 'types/user';
import type { Store } from 'types/store';
import { logErrorIfDevEnv } from 'utils/env';
import { Observable } from 'rxjs/Observable';
import firebase from 'firebase/app';
import 'firebase/firestore';

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
          return fetchGroupsFailure(404);
        }
        const groups: Group[] = snapshot.map(s => ({ id: s.id, ...s.data() }));
        return fetchGroupsSuccess(groups);
      })
      .catch(err => {
        logErrorIfDevEnv(err);
        return Observable.of(fetchGroupsFailure(400));
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
          return Observable.of(fetchCurrentGroupMembersFailure(400));
        });
    });

const updateMemberStatus = (
  action$: Observable<GroupsActions>,
  store: Store,
  { getFirebase }: { getFirebase: Function }
): Observable<GroupsActions> =>
  action$
    .ofType('UPDATE_MEMBER_STATUS')
    .mergeMap((action: UpdateMemberStatus) => {
      const { memberId, status: nextMemberStatus } = action.payload;
      const db = getFirebase().firestore();
      const memberRef = db.collection('members').doc(memberId);

      const snapshot$ = db.runTransaction(async transaction => {
        const member = await transaction.get(memberRef);
        if (!member.exists) {
          throw new Error('Ooops, this member does not exist.');
        }
        const {
          groupId,
          ticketUnits: memberTicketUnits,
          status: currentMemberStatus,
        } = member.data();

        const groupRef = db.collection('groups').doc(groupId);
        const group = await transaction.get(groupRef);
        if (!group.exists) {
          throw new Error('Ooops, this group does not exist.');
        }
        const { pendingRequests, ticketUnits: groupTicketUnits } = group.data();

        const userIsAlreadyConfirmed =
          currentMemberStatus === 'confirmed' && nextMemberStatus === 'refused';

        const updatedPendingRequests = userIsAlreadyConfirmed
          ? pendingRequests
          : pendingRequests - 1;

        const updatedTicketUnits = userIsAlreadyConfirmed
          ? parseInt(groupTicketUnits, 10) - parseInt(memberTicketUnits, 10)
          : parseInt(groupTicketUnits, 10) + parseInt(memberTicketUnits, 10);

        transaction.update(memberRef, {
          status: nextMemberStatus,
          statusUpdatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
        transaction.update(groupRef, {
          pendingRequests: updatedPendingRequests,
          ticketUnits: updatedTicketUnits,
        });
        return {
          groupId,
          updatedPendingRequests,
          updatedTicketUnits,
        };
      });

      return Observable.fromPromise(snapshot$)
        .flatMap(({ groupId, updatedPendingRequests, updatedTicketUnits }) =>
          Observable.concat(
            Observable.of(
              updateMemberStatusSuccess(memberId, nextMemberStatus)
            ),
            Observable.of(
              updateGroupLocally(groupId, {
                pendingRequests: updatedPendingRequests,
                ticketUnits: updatedTicketUnits,
              })
            )
          )
        )
        .catch(err => {
          logErrorIfDevEnv(err);
          return Observable.of(throwAccentSnackbar(err.message));
        });
    });

const updateGroup = (
  action$: Observable<GroupsActions>,
  store: Store,
  { getFirebase }: { getFirebase: Function }
): Observable<GroupsActions> =>
  action$.ofType('UPDATE_GROUP').mergeMap((action: UpdateGroup) => {
    const { groupId, changes } = action.payload;
    const db = getFirebase().firestore();
    const snapshot$ = db
      .collection('groups')
      .doc(groupId)
      .update(changes);

    return Observable.fromPromise(snapshot$)
      .flatMap(() =>
        Observable.concat(
          Observable.of(updateGroupLocally(groupId, changes)),
          Observable.of(
            throwDissmissSnackbar('You group preferences have been updated.')
          )
        )
      )
      .catch(err => {
        logErrorIfDevEnv(err);
        return Observable.of(
          throwAccentSnackbar(
            'Ooops, Unable to update your group preferences..'
          )
        );
      });
  });

const updateMember = (
  action$: Observable<GroupsActions>,
  store: Store,
  { getFirebase }: { getFirebase: Function }
): Observable<GroupsActions> =>
  action$.ofType('UPDATE_MEMBER').mergeMap((action: UpdateMember) => {
    const { memberId, changes } = action.payload;
    const db = getFirebase().firestore();
    const snapshot$ = db
      .collection('members')
      .doc(memberId)
      .update(changes);

    return Observable.fromPromise(snapshot$)
      .flatMap(() =>
        Observable.concat(
          Observable.of(updateMemberLocally(memberId, changes)),
          Observable.of(throwDissmissSnackbar('Paiement status updated'))
        )
      )
      .catch(err => {
        logErrorIfDevEnv(err);
        return Observable.of(
          throwAccentSnackbar('Ooops, Unable to register the paiement..')
        );
      });
  });

export default combineEpics(
  fetchGroup,
  fetchGroupMembers,
  updateMemberStatus,
  updateGroup,
  updateMember
);
