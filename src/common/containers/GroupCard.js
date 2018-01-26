// @flow

import React from 'react';
import { withStyles } from 'material-ui/styles';
import type { RequestState } from 'types/group';
import moment from 'moment';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import InfoOutlineIcon from 'material-ui-icons/InfoOutline';
import Typography from 'material-ui/Typography';
import { LinearProgress } from 'material-ui/Progress';
import Avatar from 'material-ui/Avatar';
import Popover from 'material-ui/Popover';
import GroupCardRequestButton from './GroupCardRequestButton';

type Props = {
  id: string,
  classes: Object,
  admin: {
    displayName: string,
    avatarUrl: string,
  },
  stations: {
    departure: string,
    arrival: string,
  },
  dateTime: Object,
  members: {
    current: number,
    target: number,
  },
  requestState: RequestState,
  info?: string,
};

type State = {
  popoverAnchorEl: HTMLElement | null,
};

class GroupCard extends React.Component<Props, State> {
  static defaultProps = {
    info: null,
  };

  constructor(props) {
    super(props);
    this.handlePopoverClick = this.handlePopoverClick.bind(this);
  }

  state = {
    popoverAnchorEl: null,
  };

  handlePopoverClick: Function;

  handlePopoverClick(event) {
    event.persist();
    this.setState(state => ({
      popoverAnchorEl: state.popoverAnchorEl ? null : event.target,
    }));
  }

  render() {
    const {
      id,
      classes,
      stations,
      dateTime,
      members,
      info,
      admin,
      requestState,
    } = this.props;
    const { popoverAnchorEl } = this.state;
    const mDateTime = moment(dateTime);
    const fDate = mDateTime.format('MMM Do');
    const fTimeStart = mDateTime.format('ha');
    const fTimeEnd = mDateTime.add(1, 'h').format('ha');
    const groupCompletion = members.current / members.target * 100;
    const popoverOpened = !!popoverAnchorEl;
    return (
      <Card>
        <CardHeader
          avatar={
            <Avatar
              aria-label="Profile"
              src={admin.avatarUrl}
              alt={admin.displayName}
            />
          }
          title={`${stations.departure} to ${stations.arrival}`}
          subheader={`${fDate}, ${fTimeStart} - ${fTimeEnd}`}
          action={
            <GroupCardRequestButton groupId={id} requestState={requestState} />
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
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          {info && (
            <div>
              <IconButton
                aria-label="Show information"
                onClick={this.handlePopoverClick}
              >
                <InfoOutlineIcon />
              </IconButton>
              <Popover
                className={classes.popover}
                classes={{
                  paper: classes.paper,
                }}
                open={popoverOpened}
                anchorEl={popoverAnchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                onClose={this.handlePopoverClick}
              >
                <Typography type="body1">{info}</Typography>
              </Popover>
            </div>
          )}
          <Typography
            type="body1"
            color="secondary"
            className={classes.createdBy}
          >
            Created by {admin.displayName}
          </Typography>
        </CardActions>
      </Card>
    );
  }
}

const styles = ({ spacing, palette }) => ({
  cardContent: {
    '&:last-child': {
      paddingBottom: spacing.unit * 2,
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
    color: palette.text.secondary,
    textTransform: 'uppercase',
  },
  paper: {
    padding: spacing.unit,
  },
  popover: {
    pointerEvents: 'none',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  createdBy: {
    paddingRight: spacing.unit * 2 - 4,
    marginLeft: 'auto',
  },
});

export default withStyles(styles)(GroupCard);
