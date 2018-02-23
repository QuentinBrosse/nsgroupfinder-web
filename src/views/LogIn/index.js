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
import Typography from 'material-ui/Typography';
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
          <Typography style={{ color: 'white' }}>
            Please remember that this product is in beta. If find anything wrong
            or want to give a feedback, do no hesitate to write on Twitter or
            Messenger.
          </Typography>
        </div>
        <div className={classes.top}>
          <img
            alt="NSLogo"
            className={classes.img}
            src="https://i.imgur.com/pbCT0Uh.jpg"
          />
        </div>
        <div className={classes.center}>
          <div className={classes.step}>
            <i className={'material-icons ' + classes.stepIcon}>search</i>
            <Typography variant="display1">Search for your travel</Typography>
          </div>
          <i className={'material-icons ' + classes.arrowIcon}>arrow_forward</i>
          <div className={classes.step}>
            <i className={'material-icons ' + classes.stepIcon}>group_work</i>
            <Typography variant="display1">Connect with people</Typography>
          </div>
          <i className={'material-icons ' + classes.arrowIcon}>arrow_forward</i>
          <div className={classes.step}>
            <i className={'material-icons ' + classes.stepIcon}>train</i>
            <Typography variant="display1">
              Get your tickets & travel
            </Typography>
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
            <i className="material-icons">arrow_forward</i>
          </Button>
        </div>
        <div className={classes.footer}>
          <div className={classes.footerLeft}>
            <a
              className={classes.socialinks}
              href="https://www.facebook.com/nsgroupfinder/"
              target="_blank"
            >
              <img
                alt="sociallogo"
                className={classes.socialLogos}
                src="http://webiconspng.com/wp-content/uploads/2017/09/Facebook-PNG-Image-38915.png"
              />
            </a>
            <a
              className={classes.socialinks}
              href="https://twitter.com/finder_ns"
              target="_blank"
            >
              <img
                alt="sociallogo"
                className={classes.socialLogos}
                src="http://pngimg.com/uploads/twitter/twitter_PNG29.png"
              />
            </a>
          </div>
          <div className={classes.footerRight}>
            Copyright © 2008 NSGroupFinder Inc.
          </div>
        </div>
      </div>
    );
  }
}

const styles = ({ spacing, breakpoints }) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    height: '100vh',
  },
  beta: {
    height: 'auto',
    padding: 10,
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
    height: 'auto',

    [breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  step: {
    fontSize: 30,
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: '3vh',

    [breakpoints.down('xs')]: {
      fontSize: 20,
    },
  },
  stepIcon: {
    fontSize: 100,
    color: indigo['500'],
    marginBottom: '3vh',

    [breakpoints.down('xs')]: {
      fontSize: 60,
      marginBottom: 0,
    },
  },
  arrowIcon: {
    [breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  bottom: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    height: 'auto',
    display: 'flex',
    padding: 5,
    fontSize: 11,
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },

  footerLeft: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  footerRight: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  socialLogos: {
    height: 30,
    width: 30,
  },

  socialinks: {
    display: 'flex',
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
