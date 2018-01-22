// @flow

import React from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import Icon from 'material-ui/Icon';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider/Divider';
import { StationAutocomplete } from 'common/containers';
import { InputIconAdornment } from 'common/components';

type Props = {
  classes: Object,
  className: string,
};

type State = {};

class CreateGroup extends React.Component<Props, State> {
  static defaultProps = {};
  render() {
    const { classes, className } = this.props;
    return (
      <Card className={className}>
        <CardHeader title="Create a Group" />
        <CardContent>
          <Typography type="body1">
            <p>Some informations...</p>
            <p>
              Dolor dolor tempor ad aliquip do laborum mollit. Cupidatat est
              esse eiusmod elit qui cupidatat in. Labore consectetur ex tempor
              tempor fugiat minim cupidatat esse sunt do labore qui.
              <br />
              Velit excepteur est occaecat nisi in do ut in voluptate dolor.
              Ipsum sint eiusmod officia anim Lorem. Laboris nostrud consequat
              proident anim ex ut ullamco.
            </p>
          </Typography>
          <Divider className={classes.divdier} />
          <Grid container>
            <Grid item xs={12}>
              <div className={classes.stationsContainer}>
                <StationAutocomplete
                  id="departure"
                  placeholder="Departure Station"
                  iconName="train"
                />
                <Icon className={classes.stationArrowContainer}>
                  arrow_forward
                </Icon>
                <StationAutocomplete
                  id="arrival"
                  placeholder="Arrival Station"
                  iconName="train"
                />
              </div>
            </Grid>
          </Grid>
          <Grid
            container
            justify="space-between"
            className={classes.dateTimeContainer}
          >
            <Grid item xs={12} sm={6}>
              <TextField
                id="date"
                label="Date"
                type="date"
                defaultValue="2017-05-24"
                fullWidth
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: <InputIconAdornment iconName="date_range" />,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="time"
                label="Time"
                type="time"
                defaultValue="07:30"
                fullWidth
                InputLabelProps={{ shrink: true }}
                helperText="A one-hour hourly range"
                InputProps={{
                  startAdornment: <InputIconAdornment iconName="date_range" />,
                }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            justify="space-between"
            className={classes.dateTimeContainer}
          >
            <Grid item xs={12}>
              <TextField
                id="infos"
                label="Infos"
                type="text"
                placeholder="I like talking about my mother.."
                fullWidth
                InputLabelProps={{ shrink: true }}
                helperText="Information you want to communicate to users. They will be visible to all users (even those who will not be members of the group)."
                multiline
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button dense>Create</Button>
        </CardActions>
      </Card>
    );
  }
}

const styles = theme => ({
  stationsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stationTextFieldContainer: {
    background: 'grey',
  },
  stationArrowContainer: {
    display: 'none',
    padding: '0 20px',
    textAlign: 'center',
  },
  '@media (min-width: 600px)': {
    stationsContainer: {
      flexDirection: 'row',
    },
    stationTextFieldContainer: {
      flex: '1 1 auto',
    },
    stationArrowContainer: {
      display: 'block',
      flex: '0 0 auto',
    },
  },
  divdier: {
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 4,
  },
  dateTimeContainer: {
    marginTop: 20,
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
});

export default withStyles(styles)(CreateGroup);
