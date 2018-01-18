// @flow

import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import { throwDissmissSnackbar, throwAccentSnackbar } from 'actions/snackbar';

type Props = {
  classes: Object,
  firebase: Object,
  dThrowDissmissSnackbar: Function,
  dThrowAccentSnackbar: Function,
};

type State = {};

class LogInButton extends React.Component<Props, State> {
  static defaultProps = {};

  logIn = () => {
    const {
      firebase,
      dThrowDissmissSnackbar,
      dThrowAccentSnackbar,
    } = this.props;
    firebase
      .login({
        provider: 'facebook',
        type: 'popup',
      })
      .then(() => dThrowDissmissSnackbar('Welcome back !'))
      .catch(() => dThrowAccentSnackbar('Ooops, try again later please :/'));
  };

  render() {
    const { classes } = this.props;
    return (
      <Button className={classes.button} color="inherit" onClick={this.logIn}>
        Login with Facebook
      </Button>
    );
  }
}

const styles = {
  button: {},
};

const mapDispatchToProps = {
  dThrowDissmissSnackbar: throwDissmissSnackbar,
  dThrowAccentSnackbar: throwAccentSnackbar,
};

export default compose(
  firebaseConnect(),
  withStyles(styles),
  connect(null, mapDispatchToProps)
)(LogInButton);
