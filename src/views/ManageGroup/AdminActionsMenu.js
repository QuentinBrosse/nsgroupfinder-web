// @flow

import React from 'react';
import { withStyles } from 'material-ui/styles';
import ActionIcon from 'material-ui-icons/MoreVert';
import IconButton from 'material-ui/IconButton';

type Props = {
  classes: Object,
};

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

const styles = {};

export default withStyles(styles)(AdminActionsMenu);
