// @flow

import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Stepper, { Step, StepLabel, StepContent } from 'material-ui/Stepper';

type Props = {
  classes: Object,
};

type State = {
  activeStep: number,
};

function getSteps() {
  return [
    'Search for a group',
    'Send a request to the group',
    'Well done ! you find your group',
  ];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return `Start by using the departure and arrival stationt that match exaclty your travel path. Then if no groups are found, try by using a bigger path.
       That means that if your path (Zwolle to Almere Centrum) is on a bigger path that is used a lot like Groningen to Amsterdam Centraal, you need to use this one. You can use ns.nl to find the best route for you.
       You ll not be the group leader but you are allowed to jump in the train at a later station and find him. Also, look at the indication that the admin wrote for who might be interested in their group. You can find more details about the journey`;
    case 1:
      return (
        'You can send a request to the group. Then the group admin will falidate or refuse your request based on how many people are in the group or for a other reason.' +
        ' Remember that you can send a text message with your request so you can explain a litle bit more about why you are choosing this group.'
      );
    case 2:
      return `Now that the admin of the group accepted your request, you can see who are the other people that you ll be traveling with. You can also see who has already paid and
       the text message that the admin wrote only for the group members. It's your choice to use any type of group communication to plan the last details of your amazing trip !`;
    default:
      return 'Unknown step';
  }
}

class VerticalLinearStepper extends React.Component<Props, State> {
  state = {
    activeStep: 0,
  };

  handleNext = () => {
    this.setState({
      activeStep: this.state.activeStep + 1,
    });
  };

  handleBack = () => {
    this.setState({
      activeStep: this.state.activeStep - 1,
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                <Typography>{getStepContent(index)}</Typography>
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={this.handleBack}
                      className={classes.button}
                    >
                      Back
                    </Button>
                    <Button
                      variant="raised"
                      color="primary"
                      onClick={this.handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>Easy right ?</Typography>
            <Button onClick={this.handleReset} className={classes.button}>
              Reset
            </Button>
          </Paper>
        )}
      </div>
    );
  }
}

const styles = ({ spacing }) => ({
  root: {
    width: '90%',
  },
  actionsContainer: {
    marginBottom: spacing.unit * 2,
  },
  resetContainer: {
    padding: spacing.unit * 3,
  },
});

export default withStyles(styles)(VerticalLinearStepper);
