// @flow

import React from 'react';
import type { Node } from 'react';
import type { Group } from 'types/group';
import { withStyles } from 'material-ui/styles';
import Card, { CardHeader, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Tooltip from 'material-ui/Tooltip';
import ShareIcon from 'material-ui-icons/Share';
import TicketsProgess from 'common/components/TicketsProgress';
import moment from 'moment';

type Props = {
  classes: Object,
  group: Group,
};

const Header = ({ classes, group }: Props): Node => {
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
              <Button
                className={classes.button}
                variant="raised"
                color="secondary"
              >
                <Typography variant="button" color="primary">
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
        <Typography variant="subheading">Public Info</Typography>
        <Typography component="p" paragraph>
          {group.publicInfo}
        </Typography>
        <Typography variant="subheading">Private Info</Typography>
        <Typography component="p" paragraph>
          {group.privateInfo}
        </Typography>
        <div className={classes.progressContaier}>
          <TicketsProgess ticketUnits={group.ticketUnits} />
        </div>
      </CardContent>
    </Card>
  );
};

Header.defaultProps = {};

const styles = ({ spacing }) => ({
  card: {
    marginBottom: spacing.unit * 2,
  },
  progressContaier: {
    marginTop: spacing.unit * 4,
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
