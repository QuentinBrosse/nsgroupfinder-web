// @flow

import type { ThrowSnackbar, DismissSnackbar } from 'types/snackbar';

export const throwDefaultSnackbar = (
  message: string,
  buttonLabel: null | string = null,
  actionOnClickButton: null | Object = null
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
      color: 'secondary',
      label: 'Dismiss',
      actionOnClickButton: null,
    },
  },
});

export const throwAccentSnackbar = (
  message: string,
  buttonLabel: null | string = null,
  actionOnClickButton: null | Object = null
): ThrowSnackbar => ({
  type: 'SNACKBAR_THROW',
  payload: {
    message,
    button: {
      color: 'secondary',
      label: buttonLabel,
      actionOnClickButton,
    },
  },
});

export const dismissSnackbar = (): DismissSnackbar => ({
  type: 'SNACKBAR_DISMISS',
});
