// @flow

import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import LogInButton from 'common/containers/LogInButton';

type Props = {
  classes: Object,
};

type State = {};

class LogIn extends React.Component<Props, State> {
  static defaultProps = {};

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <Paper className={classes.paper}>
          <Typography variant="headline" align="center">
            NS Group Finder
          </Typography>
          <Typography variant="subheading" align="center" color="primary">
            Connect using Facebook{' '}
            <span role="img" aria-label="Sad emojy">
              😘
            </span>
          </Typography>

          <div className={classes.button}>
            <LogInButton redirectAfterLogIn />
          </div>
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

export default withStyles(styles)(LogIn);
