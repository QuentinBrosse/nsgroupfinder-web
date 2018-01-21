// @flow

import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { withStyles } from 'material-ui/styles';
import MenuItem from 'material-ui/Menu/MenuItem';
import { throwDissmissSnackbar, throwAccentSnackbar } from 'actions/snackbar';

type Props = {
  classes: Object,
  firebase: Object,
  dThrowDissmissSnackbar: Function,
  dThrowAccentSnackbar: Function,
};

type State = {};

class LogOutMenuItem extends React.Component<Props, State> {
  static defaultProps = {};

  logOut = () => {
    const {
      firebase,
      dThrowDissmissSnackbar,
      dThrowAccentSnackbar,
    } = this.props;
    firebase
      .logout()
      .then(() => dThrowDissmissSnackbar('See you soon !'))
      .catch(() => dThrowAccentSnackbar('Ooops, try again later please :/'));
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

const mapDispatchToProps = {
  dThrowDissmissSnackbar: throwDissmissSnackbar,
  dThrowAccentSnackbar: throwAccentSnackbar,
};

export default compose(
  firebaseConnect(),
  withStyles(styles),
  connect(null, mapDispatchToProps)
)(LogOutMenuItem);
