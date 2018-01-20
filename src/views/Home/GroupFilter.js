// @flow

import React from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Card, { CardContent, CardActions } from 'material-ui/Card';
import Icon from 'material-ui/Icon';
import { StationAutocomplete } from 'common/containers';

type Props = {
  classes: Object,
};

type State = {};

class GroupFilter extends React.Component<Props, State> {
  static defaultProps = {};
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent>
          <Grid container className={classes.root}>
            <Grid item xs={12}>
              <Typography type="title" component="h2">
                Find your Journey Group
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <form className={classes.form} noValidate autoComplete="off">
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
              </form>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button dense>Search</Button>
        </CardActions>
      </Card>
    );
  }
}

const styles = {
  card: {},
  form: {},
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
  cardActions: {
    justifyContent: 'flex-end',
  },
};

export default withStyles(styles)(GroupFilter);
