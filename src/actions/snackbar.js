// @flow

import type { ThrowSnackbar, DismissSnackbar } from 'types/snackbar';

export const throwDefaultSnackbar = (
  message: string,
  buttonLabel: string,
  actionOnClickButton: Object
): ThrowSnackbar => ({
  type: 'SNACKBAR_THROW',
  payload: {
    message,
    button: {
      type: 'default',
      label: buttonLabel,
      actionOnClickButton,
    },
  },
});

export const throwDissmissSnackbar = (message: string): ThrowSnackbar => ({
  type: 'SNACKBAR_THROW',
  payload: {
    message,
    button: {
      type: 'default',
      label: 'Dismiss',
      actionOnClickButton: null,
    },
  },
});

export const throwAccentSnackbar = (
  message: string,
  buttonLabel: string,
  actionOnClickButton: Object
): ThrowSnackbar => ({
  type: 'SNACKBAR_THROW',
  payload: {
    message,
    button: {
      type: 'accent',
      label: buttonLabel,
      actionOnClickButton,
    },
  },
});

export const dismissSnackbar = (): DismissSnackbar => ({
  type: 'SNACKBAR_DISMISS',
});
