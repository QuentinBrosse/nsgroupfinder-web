// @flow

import type { Member, MemberStatus, FirebaseUserOpti } from './user';
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

export type CurrentGroup = {
  +isLoading: boolean,
  +groupIdx: null | number,
  +members: Member[],
  +error: boolean,
};

// State
export type GroupsState = {
  +isLoading: boolean,
  +groups: Group[],
  +error: boolean,
  +currentGroup: CurrentGroup,
};

// Actions Creators
export type FetchGroups = {
  +type: 'FETCH_GROUPS',
  +payload: {
    +groupIds: string[],
  },
};

export type FetchGroupsSuccess = {
  +type: 'FETCH_GROUPS_SUCCESS',
  +payload: {
    +groups: Group[],
  },
};

export type FetchGroupsFailure = {
  +type: 'FETCH_GROUPS_FAILURE',
  +payload: {},
};

export type UpdateGroup = {
  +type: 'UPDATE_GROUP',
  +payload: {
    groupId: string,
    changes: Object,
  },
};

export type UpdateGroupLocally = {
  +type: 'UPDATE_GROUP_LOCALLY',
  +payload: {
    groupId: string,
    changes: Object,
  },
};

export type FetchCurrentGroupMembers = {
  +type: 'FETCH_CURRENT_GROUP_MEMBERS',
  +payload: {
    +groupId: string,
    +groupIdx: number,
  },
};

export type FetchCurrentGroupMembersSuccess = {
  +type: 'FETCH_CURRENT_GROUP_MEMBERS_SUCCESS',
  +payload: {
    +members: Member[],
  },
};

export type FetchCurrentGroupMembersFailure = {
  +type: 'FETCH_CURRENT_GROUP_MEMBERS_FAILURE',
  +payload: {},
};

export type UpdateMemberStatus = {
  +type: 'UPDATE_MEMBER_STATUS',
  +payload: {
    memberId: string,
    status: MemberStatus,
  },
};

export type UpdateMemberStatusSuccess = {
  +type: 'UPDATE_MEMBER_STATUS_SUCCESS',
  +payload: {
    memberId: string,
    status: MemberStatus,
  },
};

export type GroupsActions =
  | FetchGroups
  | FetchGroupsSuccess
  | FetchGroupsFailure
  | UpdateGroup
  | UpdateGroupLocally
  | FetchCurrentGroupMembers
  | FetchCurrentGroupMembersSuccess
  | FetchCurrentGroupMembersFailure
  | UpdateMemberStatus
  | UpdateMemberStatusSuccess;
