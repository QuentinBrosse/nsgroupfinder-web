// @flow

import type { GroupsState, GroupsActions } from 'types/group';

const initialState: GroupsState = {
  isLoading: true,
  groups: [],
};

export default (
  state: GroupsState = initialState,
  action: GroupsActions
): GroupsState => {
  switch (action.type) {
    case 'GROUPS_FETCH':
      return {
        ...state,
        isLoading: true,
      };
    case 'GROUPS_FETCH_SUCCESS':
      return {
        isLoading: false,
        groups: [...state.groups, action.payload.group],
      };
    case 'GROUPS_FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};
