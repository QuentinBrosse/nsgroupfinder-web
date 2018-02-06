// @flow

// State
export type SnackbarButtonType = 'default' | 'secondary';

export type SnackbarButton = {
  +type: SnackbarButtonType,
  +label: string | null,
  +actionOnClickButton: Object | null,
};

export type SnackbarState = {
  +message: string,
  +opened: boolean,
  +button: SnackbarButton,
};

// Actions Creators
export type ThrowSnackbar = {
  +type: 'SNACKBAR_THROW',
  +payload: {
    +message: string,
    +button: SnackbarButton,
  },
};

export type DismissSnackbar = {
  +type: 'SNACKBAR_DISMISS',
};

export type SnackbarAction = ThrowSnackbar | DismissSnackbar;
