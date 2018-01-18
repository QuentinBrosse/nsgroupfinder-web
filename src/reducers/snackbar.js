// @flow

import type { SnackbarState, SnackbarAction } from 'types/snackbar';

const initialState: SnackbarState = {
  message: '',
  opened: false,
  button: {
    type: 'default',
    label: null,
    actionOnClickButton: null,
  },
};

export default (
  state: SnackbarState = initialState,
  action: SnackbarAction
): SnackbarState => {
  switch (action.type) {
    case 'SNACKBAR_THROW':
      return {
        opened: true,
        ...action.payload,
      };
    case 'SNACKBAR_DISMISS':
      return initialState;
    default:
      return state;
  }
};
