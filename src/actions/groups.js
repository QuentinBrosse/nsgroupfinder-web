// @flow

import type {
  Group,
  FetchGroups,
  FetchGroupsSuccess,
  FetchGroupsFailure,
} from 'types/group';

export const fetchGroup = (groupId: string): FetchGroups => ({
  type: 'GROUPS_FETCH',
  payload: {
    groupId,
  },
});

export const fetchGroupSuccess = (group: Group): FetchGroupsSuccess => ({
  type: 'GROUPS_FETCH_SUCCESS',
  payload: {
    group,
  },
});

export const fetchGroupFailure = (groupId: string): FetchGroupsFailure => ({
  type: 'GROUPS_FETCH_FAILURE',
  payload: {
    groupId,
  },
});
