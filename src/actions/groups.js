// @flow

import type {
  Group,
  FetchGroups,
  FetchGroupsSuccess,
  FetchGroupsFailure,
  UpdateGroup,
  FetchCurrentGroupMembers,
  FetchCurrentGroupMembersSuccess,
  FetchCurrentGroupMembersFailure,
  UpdateMemberStatus,
  UpdateMemberStatusSuccess,
} from 'types/group';
import type { Member, MemberStatus } from 'types/user';

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

export const updateGroup = (groupId: string, changes: Object): UpdateGroup => ({
  type: 'UPDATE_GROUP',
  payload: {
    groupId,
    changes,
  },
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

export const updateMemberStatus = (
  memberId: string,
  status: MemberStatus
): UpdateMemberStatus => ({
  type: 'UPDATE_MEMBER_STATUS',
  payload: {
    memberId,
    status,
  },
});

export const updateMemberStatusSuccess = (
  memberId: string,
  status: MemberStatus
): UpdateMemberStatusSuccess => ({
  type: 'UPDATE_MEMBER_STATUS_SUCCESS',
  payload: {
    memberId,
    status,
  },
});
