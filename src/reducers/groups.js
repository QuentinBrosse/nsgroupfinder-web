// @flow

import type { GroupsState, GroupsActions } from 'types/group';

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
    default:
      return state;
  }
};
