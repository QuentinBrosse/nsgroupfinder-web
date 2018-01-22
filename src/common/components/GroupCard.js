// @flow

import React from 'react';
import type { Node } from 'react';
import { withStyles } from 'material-ui/styles';
import Card, { CardHeader, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import { LinearProgress } from 'material-ui/Progress';
import Avatar from 'material-ui/Avatar';

type Props = {
  classes: Object,
  stations: {
    departure: string,
    arrival: string,
  },
  date: Object,
  time: {
    start: Object,
    end: Object,
  },
  members: {
    current: number,
    target: number,
  },
  info?: string,
};

const GroupCard = ({
  classes,
  stations,
  date,
  time,
  members,
  info,
}: Props): Node => {
  const fDate = date.format('MMM Do');
  const fTimeStart = time.start.format('ha');
  const fTimeEnd = time.end.format('ha');
  const groupCompletion = members.current / members.target * 100;
  return (
    <Card>
      <CardHeader
        avatar={<Avatar aria-label="Profile">Q</Avatar>}
        title={`${stations.departure} to ${stations.arrival}`}
        subheader={`${fDate}, ${fTimeStart} - ${fTimeEnd}`}
        action={
          <IconButton>
            <Icon>check_circle</Icon>
          </IconButton>
        }
      />
      <CardContent classes={{ root: classes.cardContent }}>
        <LinearProgress mode="determinate" value={groupCompletion} />
        <div className={classes.members}>
          <Typography type="body1" classes={{ body1: classes.membersText }}>
            Members
          </Typography>
          <Typography type="body1" classes={{ body1: classes.membersText }}>
            {members.current}/{members.target}
          </Typography>
        </div>
        <div className={classes.infos}>
          <Icon className={classes.infoIcon}>info_outline</Icon>
          <Typography type="body1" color="secondary" noWrap>
            {info}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

GroupCard.defaultProps = {
  info: 'Not yet..',
};

const styles = theme => ({
  cardContent: {
    '&:last-child': {
      paddingBottom: theme.spacing.unit * 2,
    },
  },
  members: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 3,
  },
  membersText: {
    fontSize: '0.7rem',
    fontWeight: 500,
    color: theme.palette.text.secondary,
    textTransform: 'uppercase',
  },
  infos: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing.unit * 2,
    '& :first-child': {
      marginRight: theme.spacing.unit,
    },
  },
  infoIcon: {
    fontSize: 20,
  },
});

export default withStyles(styles)(GroupCard);
