// @flow

import React from 'react';
import type { Node } from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import moment from 'moment';

type Props = {
  classes: Object,
  dateTime: Date,
};

const DateFromNow = ({ classes, dateTime }: Props): Node => (
  <Typography color="textSecondary">{moment(dateTime).fromNow()}</Typography>
);

DateFromNow.defaultProps = {};

const styles = {};

export default withStyles(styles)(DateFromNow);
