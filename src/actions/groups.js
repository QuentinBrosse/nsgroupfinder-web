// @flow

import type {
  Group,
  FetchGroups,
  FetchGroupsSuccess,
  FetchGroupsFailure,
  FetchCurrentGroupMembers,
  FetchCurrentGroupMembersSuccess,
  FetchCurrentGroupMembersFailure,
} from 'types/group';
import type { Member } from 'types/user';

export const fetchGroups = (groupIds: string[]): FetchGroups => ({
  type: 'FETCH_GROUPS',
  payload: {
    groupIds,
  },
});

export const fetchGroupsSuccess = (groups: Group[]): FetchGroupsSuccess => ({
  type: 'FETCH_GROUPS_SUCCESS',
  payload: {
    groups,
  },
});

export const fetchGroupsFailure = (): FetchGroupsFailure => ({
  type: 'FETCH_GROUPS_FAILURE',
  payload: {},
});

export const fetchCurrentGroupMembers = (
  groupId: string,
  groupIdx: number
): FetchCurrentGroupMembers => ({
  type: 'FETCH_CURRENT_GROUP_MEMBERS',
  payload: {
    groupId,
    groupIdx,
  },
});

export const fetchCurrentGroupMembersSuccess = (
  members: Member[]
): FetchCurrentGroupMembersSuccess => ({
  type: 'FETCH_CURRENT_GROUP_MEMBERS_SUCCESS',
  payload: {
    members,
  },
});

export const fetchCurrentGroupMembersFailure = (): FetchCurrentGroupMembersFailure => ({
  type: 'FETCH_CURRENT_GROUP_MEMBERS_FAILURE',
  payload: {},
});
