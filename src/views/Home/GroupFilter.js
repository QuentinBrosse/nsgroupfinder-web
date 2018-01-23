// @flow

import React from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import Icon from 'material-ui/Icon';
import TextField from 'material-ui/TextField';
import { StationAutocomplete } from 'common/containers';
import { InputIconAdornment } from 'common/components';

type Props = {
  classes: Object,
  className: string,
};

type State = {};

class GroupFilter extends React.Component<Props, State> {
  static defaultProps = {};
  render() {
    const { classes, className } = this.props;
    return (
      <Card className={className}>
        <CardHeader title="Find your Journey Group" />
        <CardContent>
          <Grid container>
            <Grid item xs={12} className={classes.firstGridItem}>
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
            <Grid item xs={12} sm={4}>
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
            <Grid item xs={12} sm={4}>
              <TextField
                id="start_time"
                label="Leave from"
                type="time"
                defaultValue="07:30"
                fullWidth
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: <InputIconAdornment iconName="date_range" />,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="end_time"
                label="Leave until"
                type="time"
                defaultValue="08:30"
                fullWidth
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: <InputIconAdornment iconName="access_time" />,
                }}
              />
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

const styles = ({ spacing, breakpoints }) => ({
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
    padding: [[0, 20]],
    textAlign: 'center',
  },
  [breakpoints.up('sm')]: {
    stationsContainer: {
      flexDirection: 'row',
    },
    stationTextFieldContainer: {
      flex: [1, 1, 'auto'],
    },
    stationArrowContainer: {
      display: 'block',
      flex: [0, 0, 'auto'],
    },
  },
  firstGridItem: {
    paddingTop: [0, '!important'],
  },
  dateTimeContainer: {
    marginTop: spacing.unit * 2,
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
});

export default withStyles(styles)(GroupFilter);
