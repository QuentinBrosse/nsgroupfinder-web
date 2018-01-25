// @flow

// /* eslint-disable jsx-a11y/mouse-events-have-key-events */

import React from 'react';
import { withStyles } from 'material-ui/styles';
import moment from 'moment';
import Card, { CardHeader, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import { LinearProgress } from 'material-ui/Progress';
import Avatar from 'material-ui/Avatar';
import Popover from 'material-ui/Popover';

type Props = {
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
    this.handlePopoverOpen = this.handlePopoverOpen.bind(this);
    this.handlePopoverClose = this.handlePopoverClose.bind(this);
  }

  state = {
    popoverAnchorEl: null,
  };

  handlePopoverOpen: Function;
  handlePopoverClose: Function;

  handlePopoverOpen(event) {
    this.setState({ popoverAnchorEl: event.target });
  }

  handlePopoverClose() {
    this.setState({ popoverAnchorEl: null });
  }

  render() {
    const { classes, stations, dateTime, members, info, admin } = this.props;
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
            <Icon
              className={classes.infoIcon}
              onMouseOver={this.handlePopoverOpen}
              onFocus={this.handlePopoverOpen}
              onMouseOut={this.handlePopoverClose}
              onBlur={this.handlePopoverClose}
            >
              info_outline
            </Icon>
            <Typography type="body1" color="secondary" noWrap>
              {info || 'Not yet...'}
            </Typography>
          </div>
        </CardContent>
        {info && (
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
            onClose={this.handlePopoverClose}
          >
            <Typography>{info}</Typography>
          </Popover>
        )}
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
  infos: {
    display: 'flex',
    alignItems: 'center',
    marginTop: spacing.unit * 2,
    '& :first-child': {
      marginRight: spacing.unit,
    },
  },
  infoIcon: {
    fontSize: 20,
  },
  paper: {
    padding: spacing.unit,
  },
  popover: {
    pointerEvents: 'none',
  },
});

export default withStyles(styles)(GroupCard);
