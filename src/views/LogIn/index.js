// @flow

import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import red from 'material-ui/colors/red';
import indigo from 'material-ui/colors/indigo';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Stepper, { Step, StepButton } from 'material-ui/Stepper';
import { throwDissmissSnackbar, throwAccentSnackbar } from 'actions/snackbar';
import { isConnected } from 'utils/user';
import { logErrorIfDevEnv } from 'utils/env';

type Props = {
  classes: Object,
  firebase: Object,
  auth: Object,
  location: Object,
  dThrowDissmissSnackbar: Function,
  dThrowAccentSnackbar: Function,
};

type State = {};

class LogIn extends React.Component<Props, State> {
  static defaultProps = {};

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
    } catch (err) {
      logErrorIfDevEnv(err);
      dThrowAccentSnackbar('Ooops, try again later please :/');
    }
  }

  render() {
    const { classes, auth, location } = this.props;
    if (isConnected(auth)) {
      const { state } = location;
      return <Redirect to={state.returnTo || '/app'} />;
    }
    return (
      <div className={classes.container}>
        <div className={classes.beta}>
          Please remember that this product is in beta. If find anything wrong
          or want to give a feedback, do no hesitate to write on Twitter or
          Messenger.
        </div>
        <div className={classes.top}>
          <img className={classes.img} src="https://i.imgur.com/pbCT0Uh.jpg" />
        </div>
        <div className={classes.center}>
          <div className={classes.step}>
            <i className={'material-icons ' + classes.stepIcon}>search</i>
            Search for your travel
          </div>
          <i class="material-icons">arrow_forward</i>
          <div className={classes.step}>
            <i className={'material-icons ' + classes.stepIcon}>group_work</i>
            Connect with people
          </div>
          <i class="material-icons">arrow_forward</i>
          <div className={classes.step}>
            <i className={'material-icons ' + classes.stepIcon}>train</i>
            Get your tickets & travel
          </div>
        </div>
        <div className={classes.bottom}>
          <Button
            variant="raised"
            className={classes.button}
            color="secondary"
            onClick={this.logIn}
          >
            FIND A GROUP
            <i class="material-icons">arrow_forward</i>
          </Button>
        </div>
      </div>
    );
  }
}

const styles = ({ spacing }) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    height: '100vh',
  },
  beta: {
    height: '5vh',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: red['A700'],
  },
  img: {
    width: '100%',
  },
  top: {},
  center: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '30vh',
  },
  step: {
    fontSize: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  stepIcon: {
    fontSize: 100,
    color: indigo['500'],
    marginBottom: '3vh',
  },
  bottom: {
    flex: 1,
    display: 'flex',
    flexDirection: 'center',
    justifyContent: 'center',
    alignItems: 'center',
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
  withFirebase,
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(LogIn);
