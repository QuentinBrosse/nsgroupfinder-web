// @flow

import React from 'react';
import type { Node } from 'react';
import type { Group } from 'types/group';
import { withStyles } from 'material-ui/styles';
import Card, { CardHeader, CardContent } from 'material-ui/Card';
import { LinearProgress } from 'material-ui/Progress';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Tooltip from 'material-ui/Tooltip';
import ShareIcon from 'material-ui-icons/Share';
import moment from 'moment';

type Props = {
  classes: Object,
  group: Group,
};

const Header = ({ classes, group }: Props): Node => {
  const memberCompletionTarget = 7;
  const groupCompletion = group.ticketUnits / memberCompletionTarget * 100;
  const mDateTime = moment(group.dateTime);
  const fDate = mDateTime.format('MMM Do');
  const fTimeStart = mDateTime.format('ha');
  const fTimeEnd = mDateTime.add(1, 'h').format('ha');
  return (
    <Card className={classes.card}>
      <CardHeader
        action={
          <div>
            <Tooltip
              id="tooltip-right"
              title="Available soon"
              placement="right"
            >
              <Button className={classes.button} raised color="secondary">
                <Typography type="button" color="primary">
                  Share
                </Typography>
                <ShareIcon color="primary" className={classes.rightIcon} />
              </Button>
            </Tooltip>
          </div>
        }
        title={`${group.departureStation.name} to ${group.arrivalStation.name}`}
        subheader={`${fDate}, ${fTimeStart} - ${fTimeEnd}`}
      />
      <CardContent>
        <Typography type="subheading">Public Info</Typography>
        <Typography component="p" paragraph>
          {group.publicInfo}
        </Typography>
        <Typography type="subheading">Private Info</Typography>
        <Typography component="p" paragraph>
          {group.privateInfo}
        </Typography>
        <div className={classes.progressContaier}>
          <LinearProgress mode="determinate" value={groupCompletion} />
          <div className={classes.tickets}>
            <Typography type="body1" classes={{ body1: classes.ticketsText }}>
              Tickets
            </Typography>
            <Typography type="body1" classes={{ body1: classes.ticketsText }}>
              {group.ticketUnits}/{memberCompletionTarget}
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

Header.defaultProps = {};

const styles = ({ spacing, palette }) => ({
  card: {
    marginBottom: spacing.unit * 2,
  },
  progressContaier: {
    marginTop: spacing.unit * 4,
  },
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
  button: {
    margin: spacing.unit,
    marginRight: spacing.unit * 2,
  },
  rightIcon: {
    marginLeft: spacing.unit,
  },
});

export default withStyles(styles)(Header);
