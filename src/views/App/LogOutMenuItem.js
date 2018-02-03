// @flow

import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import MenuItem from 'material-ui/Menu/MenuItem';
import { throwDissmissSnackbar, throwAccentSnackbar } from 'actions/snackbar';
import { logErrorIfDevEnv } from 'utils/env';

type Props = {
  firebase: Object,
  dThrowDissmissSnackbar: Function,
  dThrowAccentSnackbar: Function,
};

type State = {};

class LogOutMenuItem extends React.Component<Props, State> {
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
  }

  logOut: Function;

  async logOut() {
    const {
      firebase,
      dThrowDissmissSnackbar,
      dThrowAccentSnackbar,
    } = this.props;
    try {
      await firebase.logout();
      dThrowDissmissSnackbar('See you soon !');
    } catch (err) {
      logErrorIfDevEnv(err);
      dThrowAccentSnackbar('Ooops, try again later please :/');
    }
  }

  render() {
    return <MenuItem onClick={this.logOut}>Log Out</MenuItem>;
  }
}

const mapDispatchToProps = {
  dThrowDissmissSnackbar: throwDissmissSnackbar,
  dThrowAccentSnackbar: throwAccentSnackbar,
};

export default compose(firebaseConnect(), connect(null, mapDispatchToProps))(
  LogOutMenuItem
);
