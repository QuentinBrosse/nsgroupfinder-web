// @flow

import type {
  Group,
  FetchGroups,
  FetchGroupsSuccess,
  FetchGroupsFailure,
} from 'types/group';

export const fetchGroups = (groupId: string): FetchGroups => ({
  type: 'GROUPS_FETCH',
  payload: {
    groupId,
  },
});

export const fetchGroupsSuccess = (group: Group): FetchGroupsSuccess => ({
  type: 'GROUPS_FETCH_SUCCESS',
  payload: {
    group,
  },
});

export const fetchGroupsFailure = (): FetchGroupsFailure => ({
  type: 'GROUPS_FETCH_FAILURE',
});
