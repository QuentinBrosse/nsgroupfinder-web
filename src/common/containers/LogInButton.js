// @flow

import React from 'react';
import Button from 'material-ui/Button';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import { Redirect, withRouter } from 'react-router-dom';
import { throwDissmissSnackbar, throwAccentSnackbar } from 'actions/snackbar';
import { logErrorIfDevEnv } from 'utils/env';
import { isConnected } from 'utils/user';

type Props = {
  firebase: Object,
  auth: Object,
  location: Object,
  dThrowDissmissSnackbar: Function,
  dThrowAccentSnackbar: Function,
  redirectAfterLogIn?: boolean,
  children?: string,
  onLoggedIn?: null | Function,
};

type State = {};

class LogInButton extends React.Component<Props, State> {
  static defaultProps = {
    redirectAfterLogIn: false,
    children: 'Login with Facebook',
    onLoggedIn: null,
  };

  constructor(props) {
    super(props);
    this.logIn = this.logIn.bind(this);
  }

  logIn: Function;

  async logIn() {
    const {
      firebase,
      dThrowDissmissSnackbar,
      dThrowAccentSnackbar,
      onLoggedIn,
    } = this.props;
    try {
      const { additionalUserInfo } = await firebase.login({
        provider: 'facebook',
        type: 'popup',
      });
      const {
        first_name: firstName,
        last_name: lastName,
        age_range: ageRange,
        gender,
        id: facebookAppId,
        link: facebookLink,
      } = additionalUserInfo.profile;
      firebase.updateProfile({
        firstName,
        lastName,
        ageRange,
        gender,
        facebookAppId,
        facebookLink,
      });
      dThrowDissmissSnackbar(`Welcome ${firstName} !`);
      if (onLoggedIn) {
        onLoggedIn();
      }
    } catch (err) {
      logErrorIfDevEnv(err);
      dThrowAccentSnackbar('Ooops, try again later please :/');
    }
  }

  render() {
    const { auth, location, redirectAfterLogIn, children } = this.props;

    if (redirectAfterLogIn && isConnected(auth)) {
      const { state = {} } = location;
      return <Redirect to={state.returnTo || '/app'} />;
    }

    return (
      <Button raised color="primary" onClick={this.logIn}>
        {children}
      </Button>
    );
  }
}

const mapStateToProps = ({ firebase: { auth } }) => ({
  auth,
});

const mapDispatchToProps = {
  dThrowDissmissSnackbar: throwDissmissSnackbar,
  dThrowAccentSnackbar: throwAccentSnackbar,
};

export default compose(
  withRouter,
  withFirebase,
  connect(mapStateToProps, mapDispatchToProps)
)(LogInButton);
