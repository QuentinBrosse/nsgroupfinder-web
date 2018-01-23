// @flow

import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import { throwDissmissSnackbar, throwAccentSnackbar } from 'actions/snackbar';
import { isConnected } from 'utils/user';

type Props = {
  classes: Object,
  firebase: Object,
  auth: Object,
  dThrowDissmissSnackbar: Function,
  dThrowAccentSnackbar: Function,
};

type State = {};

class LogIn extends React.Component<Props, State> {
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
      .then(({ additionalUserInfo }) => {
        const { first_name: firstName } = additionalUserInfo.profile;
        dThrowDissmissSnackbar(`Welcome ${firstName} !`);
      })
      .catch(() => dThrowAccentSnackbar('Ooops, try again later please :/'));
  };

  render() {
    const { classes, auth } = this.props;
    if (isConnected(auth)) {
      console.log('LogIn redirect to /app');
      return <Redirect to="/app" />;
    }
    return (
      <div className={classes.container}>
        <Paper className={classes.paper}>
          <Typography type="headline" align="center">
            NS Group Finder
          </Typography>
          <Typography type="subheading" align="center" color="secondary">
            Connect or Leave{' '}
            <span role="img" aria-label="Sad emojy">
              😘
            </span>
          </Typography>
          <Button
            className={classes.button}
            color="inherit"
            onClick={this.logIn}
          >
            Login with Facebook
          </Button>
        </Paper>
      </div>
    );
  }
}

const styles = ({ spacing }) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  paper: {
    padding: [[spacing.unit * 8, spacing.unit * 6]],
  },
  button: {
    marginTop: spacing.unit * 6,
  },
});

const mapStateToProps = ({ firebase: { auth } }) => ({
  auth,
});

const mapDispatchToProps = {
  dThrowDissmissSnackbar: throwDissmissSnackbar,
  dThrowAccentSnackbar: throwAccentSnackbar,
};

export default compose(
  firebaseConnect(),
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(LogIn);
