// @flow

import React from 'react';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

type Props = {
  classes: Object,
  firebase: Object,
};

type State = {};

class LogInButton extends React.Component<Props, State> {
  static defaultProps = {};

  logIn = () => {
    this.props.firebase.login({
      provider: 'facebook',
      type: 'popup',
    });
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

export default compose(firebaseConnect(), withStyles(styles))(LogInButton);
