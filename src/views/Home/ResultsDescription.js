// @flow

import React from 'react';
import type { Node } from 'react';
import type Moment from 'moment';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

type Props = {
  classes: Object,
  departureStation: string,
  arrivalStation: string,
  startDate: Moment,
  endDate: Moment,
};

const ResultsDescription = ({
  classes,
  departureStation,
  arrivalStation,
  startDate,
  endDate,
}: Props): Node => (
  <Typography variant="body2" paragraph className={classes.text}>
    Results for <strong>{departureStation}</strong> to{' '}
    <strong>{arrivalStation}</strong> between the{' '}
    <strong>{startDate.calendar()}</strong> and{' '}
    <strong>{endDate.calendar()}</strong>:
  </Typography>
);

ResultsDescription.defaultProps = {};

const styles = ({ palette, typography }) => ({
  text: {
    fontWeight: typography.fontWeightRegular,
    color: palette.text.secondary,
    '& strong': {
      fontWeight: typography.fontWeightRegular,
      color: palette.text.primary,
    },
  },
});

export default withStyles(styles)(ResultsDescription);
