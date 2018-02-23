// @flow

import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import red from 'material-ui/colors/red';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
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
          <Typography align="center" className={classes.whiteFont}>
            <b>This tool is in beta</b>. Some bugs may still be around. If you
            find anything wrong, want to give a feedback or ask for a feature,
            please write to us on{' '}
            <a
              className={classes.whiteFont}
              href="https://twitter.com/finder_ns"
              target="_blank"
            >
              Twitter
            </a>{' '}
            or{' '}
            <a
              className={classes.whiteFont}
              href="https://twitter.com/finder_ns"
              target="_blank"
            >
              Messenger
            </a>
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
            <Icon className={classes.stepIcon} color="primary">
              search
            </Icon>
            <Typography align="center" variant="display1">
              Search for your travel
            </Typography>
          </div>
          <Icon className={classes.arrowIcon} color="primary">
            arrow_forward
          </Icon>
          <div className={classes.step}>
            <Icon className={classes.stepIcon} color="primary">
              group
            </Icon>
            <Typography align="center" variant="display1">
              Connect with people
            </Typography>
          </div>
          <Icon className={classes.arrowIcon} color="primary">
            arrow_forward
          </Icon>
          <div className={classes.step}>
            <Icon className={classes.stepIcon} color="primary">
              train
            </Icon>
            <Typography align="center" variant="display1">
              Get your tickets
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
            <Typography variant="caption">
              Copyright © 2018 NSGroupFinder Inc.
            </Typography>
          </div>
        </div>
      </div>
    );
  }
}

const styles = ({ spacing, breakpoints, palette }) => ({
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

  whiteFont: {
    color: palette.common.white,
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
