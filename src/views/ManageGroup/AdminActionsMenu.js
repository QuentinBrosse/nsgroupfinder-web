// @flow

import React from 'react';
import ActionIcon from 'material-ui-icons/MoreVert';
import IconButton from 'material-ui/IconButton';

type Props = {};

type State = {};

class AdminActionsMenu extends React.Component<Props, State> {
  static defaultProps = {};
  render() {
    return (
      <IconButton aria-label="Actions">
        <ActionIcon />
      </IconButton>
    );
  }
}

export default AdminActionsMenu;
