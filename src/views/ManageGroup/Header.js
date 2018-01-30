// @flow

import React from 'react';
import type { Node } from 'react';
import type { Group } from 'types/group';
import { withStyles } from 'material-ui/styles';
import Card, { CardHeader, CardContent } from 'material-ui/Card';
import { LinearProgress } from 'material-ui/Progress';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import ShareIcon from 'material-ui-icons/Share';
import moment from 'moment';

type Props = {
  classes: Object,
  memberCompletionTarget: number,
  memberCount: number,
  group: Group,
};

const Header = ({
  classes,
  memberCompletionTarget,
  memberCount,
  group,
}: Props): Node => {
  const groupCompletion = memberCount / memberCompletionTarget * 100;
  const mDateTime = moment(group.dateTime);
  const fDate = mDateTime.format('MMM Do');
  const fTimeStart = mDateTime.format('ha');
  const fTimeEnd = mDateTime.add(1, 'h').format('ha');
  return (
    <Card className={classes.card}>
      <CardHeader
        action={
          <IconButton>
            <ShareIcon />
          </IconButton>
        }
        title={`${group.departureStation.name} to ${group.arrivalStation.name}`}
        subheader={`${fDate}, ${fTimeStart} - ${fTimeEnd}`}
      />
      <CardContent>
        <Typography component="p">{group.info}</Typography>
        <div className={classes.progressContaier}>
          <LinearProgress mode="determinate" value={groupCompletion} />
          <div className={classes.members}>
            <Typography type="body1" classes={{ body1: classes.membersText }}>
              Members
            </Typography>
            <Typography type="body1" classes={{ body1: classes.membersText }}>
              {memberCount}/{memberCompletionTarget}
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
  members: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 3,
  },
  membersText: {
    fontSize: '0.7rem',
    fontWeight: 500,
    color: palette.text.secondary,
    textTransform: 'uppercase',
  },
});

export default withStyles(styles)(Header);