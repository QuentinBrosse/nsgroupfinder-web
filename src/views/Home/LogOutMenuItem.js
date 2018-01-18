// @flow

import React from 'react';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import { withStyles } from 'material-ui/styles';
import MenuItem from 'material-ui/Menu/MenuItem';

type Props = {
  classes: Object,
  firebase: Object,
};

type State = {};

class LogOutMenuItem extends React.Component<Props, State> {
  static defaultProps = {};

  logOut = () => {
    this.props.firebase.logout();
  };

  render() {
    const { classes } = this.props;
    return (
      <MenuItem className={classes.item} onClick={this.logOut}>
        Log Out
      </MenuItem>
    );
  }
}

const styles = {
  item: {},
};

export default compose(firebaseConnect(), withStyles(styles))(LogOutMenuItem);
