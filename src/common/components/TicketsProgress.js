// @flow

import React from 'react';
import type { Node } from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import { LinearProgress } from 'material-ui/Progress';

type Props = {
  classes: Object,
  ticketUnits: number,
};

const TicketsProgress = ({ classes, ticketUnits }: Props): Node => {
  const ticketUnitsTarget = 7;
  const groupCompletion = ticketUnits / ticketUnitsTarget * 100;

  return (
    <div>
      <LinearProgress variant="determinate" value={groupCompletion} />
      <div className={classes.tickets}>
        <Typography variant="body1" classes={{ body1: classes.ticketsText }}>
          Tickets
        </Typography>
        <Typography variant="body1" classes={{ body1: classes.ticketsText }}>
          {ticketUnits}/{ticketUnitsTarget}
        </Typography>
      </div>
    </div>
  );
};

TicketsProgress.defaultProps = {};

const styles = ({ palette }) => ({
  tickets: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 3,
  },
  ticketsText: {
    fontSize: '0.7rem',
    fontWeight: 500,
    color: palette.text.secondary,
    textTransform: 'uppercase',
  },
});

export default withStyles(styles)(TicketsProgress);
