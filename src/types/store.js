// @flow

import type { SnackbarState } from './snackbar';
import type { GroupsState } from './group';

export type Store = {
  +snackbar: SnackbarState,
  +groups: GroupsState,
};
