// @flow

import type { Group, GroupsState, GroupsActions } from 'types/group';
import type { Member, MemberStatus } from 'types/user';
import merge from 'lodash/merge';

const changeMemberStatus = (
  members: Member[],
  memberId: string,
  status: MemberStatus
): Member[] =>
  members.map(
    m => (m.id === memberId ? { ...m, status, statusUpdatedAt: new Date() } : m)
  );

const mergeArray = (
  array: Object[],
  matchId: string,
  changes: Object
): Group[] =>
  array.map(oldG => (oldG.id === matchId ? merge(oldG, changes) : oldG));

const initialState: GroupsState = {
  isLoading: false,
  groups: [],
  error: null,
  currentGroup: {
    isLoading: false,
    groupIdx: null,
    members: [],
    error: null,
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
        error: null,
      };
    case 'FETCH_GROUPS_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    case 'UPDATE_GROUP_LOCALLY': {
      const { groupId, changes } = action.payload;
      return {
        ...state,
        groups: mergeArray(state.groups, groupId, changes),
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
          error: action.payload.error,
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
    case 'UPDATE_MEMBER_LOCALLY': {
      const { memberId, changes } = action.payload;
      return {
        ...state,
        currentGroup: {
          ...state.currentGroup,
          groups: mergeArray(state.currentGroup.members, memberId, changes),
        },
      };
    }
    default:
      return state;
  }
};
