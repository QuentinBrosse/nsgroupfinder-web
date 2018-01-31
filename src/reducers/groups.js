// @flow

import type { Group, GroupsState, GroupsActions } from 'types/group';
import type { Member, MemberStatus } from 'types/user';
import _ from 'lodash';

const changeMemberStatus = (
  members: Member[],
  memberId: string,
  status: MemberStatus
): Member[] =>
  members.map(
    m => (m.id === memberId ? { ...m, status, confirmedAt: new Date() } : m)
  );

const updateGroupLocally = (
  groups: Group[],
  groupId: string,
  changes: Group
): Group[] =>
  groups.map(oldG => (oldG.id === groupId ? _.merge(oldG, changes) : oldG));

const initialState: GroupsState = {
  isLoading: false,
  groups: [],
  error: false,
  currentGroup: {
    isLoading: false,
    groupIdx: null,
    members: [],
    error: false,
  },
};

export default (
  state: GroupsState = initialState,
  action: GroupsActions
): GroupsState => {
  switch (action.type) {
    case 'FETCH_GROUPS':
      return {
        ...state,
        isLoading: true,
        groups: [],
        currentGroup: initialState.currentGroup,
      };
    case 'FETCH_GROUPS_SUCCESS':
      return {
        ...state,
        isLoading: false,
        groups: action.payload.groups,
        error: false,
      };
    case 'FETCH_GROUPS_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    case 'UPDATE_GROUP_LOCALLY': {
      const { groupId, changes } = action.payload;
      return {
        ...state,
        groups: updateGroupLocally(state.groups, groupId, changes),
      };
    }
    case 'FETCH_CURRENT_GROUP_MEMBERS':
      return {
        ...state,
        currentGroup: {
          ...initialState.currentGroup,
          isLoading: true,
          groupIdx: action.payload.groupIdx,
        },
      };
    case 'FETCH_CURRENT_GROUP_MEMBERS_SUCCESS':
      return {
        ...state,
        currentGroup: {
          ...state.currentGroup,
          isLoading: false,
          members: action.payload.members,
        },
      };
    case 'FETCH_CURRENT_GROUP_MEMBERS_FAILURE':
      return {
        ...state,
        currentGroup: {
          ...state.currentGroup,
          isLoading: false,
          groupId: null,
          error: true,
        },
      };
    case 'UPDATE_MEMBER_STATUS_SUCCESS': {
      const { memberId, status } = action.payload;
      const { members } = state.currentGroup;
      return {
        ...state,
        currentGroup: {
          ...state.currentGroup,
          members: changeMemberStatus(members, memberId, status),
        },
      };
    }
    default:
      return state;
  }
};
