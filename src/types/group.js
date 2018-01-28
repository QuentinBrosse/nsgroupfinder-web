// @flow

import type { MemberStatus, FirebaseUserOpti } from './user';
import type { FirebaseStationOpti } from './station';

export type RequestStatus = null | MemberStatus;

export type Group = {
  +id?: string,
  +admin: FirebaseUserOpti,
  +arrivalStation: FirebaseStationOpti,
  +departureStation: FirebaseStationOpti,
  +createdAt: Date,
  +dateTime: Date,
  +info: string,
  +pendingRequests: number,
};

// State
export type GroupsState = {
  +isLoading: boolean,
  +groups: Group[],
  +errors: string[],
};

// Actions Creators
export type FetchGroups = {
  +type: 'GROUPS_FETCH',
  +payload: {
    +groupId: string,
  },
};

export type FetchGroupsSuccess = {
  +type: 'GROUPS_FETCH_SUCCESS',
  +payload: {
    +group: Group,
  },
};

export type FetchGroupsFailure = {
  +type: 'GROUPS_FETCH_FAILURE',
};

export type GroupsActions =
  | FetchGroups
  | FetchGroupsSuccess
  | FetchGroupsFailure;
