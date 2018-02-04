// @flow

import React from 'react';
import type { Node } from 'react';
import Typography from 'material-ui/Typography';
import moment from 'moment';

type Props = {
  dateTime: Date,
};

const DateFromNow = ({ dateTime }: Props): Node => (
  <Typography color="textSecondary">{moment(dateTime).fromNow()}</Typography>
);

DateFromNow.defaultProps = {};

export default DateFromNow;
