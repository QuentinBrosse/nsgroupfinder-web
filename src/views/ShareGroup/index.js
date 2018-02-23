// @flow

import React from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import { withStyles } from 'material-ui/styles';
import Card, { CardHeader, CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';
import InfoOutlineIcon from 'material-ui-icons/InfoOutline';
import Button from 'material-ui/Button';
import { TicketsProgress, NSGroupFinderIcon } from 'common/components';
import { TextPopover, LogInButton } from 'common/containers';
import moment from 'moment';
import { isConnected } from 'utils/user';
import { throwAccentSnackbar } from 'actions/snackbar';
import { fetchGroups, fetchCurrentGroupMembers } from 'actions/groups';
import type { GroupsState, Group } from 'types/group';
import { Redirect } from 'react-router-dom';
import { createMember } from 'services/groups';

type Props = {
  classes: Object,
  match: {
    params: {
      groupId: string,
    },
  },
  groups: GroupsState,
  auth: Object,
  profile: Object,
  dispatch: Function,
  dFetchGroups: typeof fetchGroups,
  dThrowAccentSnackbar: typeof throwAccentSnackbar,
};

type State = {
  message: string,
  ticketUnits: number,
  redirectTo: null | string,
  currentGroup: null | Group,
};

class ShareGroup extends React.Component<Props, State> {
  static defaultProps = {};

  state = {
    message: '',
    ticketUnits: 1,
    redirectTo: null,
    currentGroup: null,
  };

  componentWillMount() {
    const { match: { params }, dFetchGroups } = this.props;

    dFetchGroups([params.groupId]);
  }

  componentWillReceiveProps(nextProps: Props) {
    const { match: { params }, dThrowAccentSnackbar } = this.props;
    const { groups } = this.props.groups;
    const { groups: nextGroups } = nextProps.groups;

    // If new group
    const nonexistentInGroups =
      groups.findIndex(g => g.id === params.groupId) === -1;
    if (nonexistentInGroups) {
      const nextGroupIdx = nextGroups.findIndex(g => g.id === params.groupId);
      const existantInNextGroups = nextGroupIdx !== -1;
      if (existantInNextGroups) {
        this.setState({ currentGroup: nextGroups[nextGroupIdx] });
        return;
      }
    }

    // Error handling
    if (nextProps.groups.error) {
      if (nextProps.groups.error === 404) {
        dThrowAccentSnackbar('This group does not exist.');
      } else {
        dThrowAccentSnackbar('Unable to fetch group.');
      }
      this.setState({ redirectTo: '/' });
    }
  }

  get infoAction() {
    const { currentGroup } = this.state;
    if (!currentGroup || !currentGroup.publicInfo) {
      return null;
    }

    return (
      <TextPopover icon={<InfoOutlineIcon />}>
        {currentGroup.publicInfo}
      </TextPopover>
    );
  }

  get avatar() {
    const { currentGroup } = this.state;
    if (!currentGroup) {
      return null;
    }

    return (
      <Avatar
        aria-label="Profile"
        src={currentGroup.admin.avatarUrl}
        alt={currentGroup.admin.displayName}
      />
    );
  }

  get requestButton() {
    const { auth } = this.props;

    if (isConnected(auth)) {
      return (
        <Button raised color="primary" onClick={this.sendRequest}>
          Request Tickets
        </Button>
      );
    }
    return (
      <LogInButton onLoggedIn={this.sendRequest}>
        Connect and Request Tickets
      </LogInButton>
    );
  }

  handleChanges = (field: string) => event => {
    this.setState({ [field]: event.target.value });
  };

  sendRequest = () => {
    const { auth, profile, dispatch } = this.props;
    const { currentGroup, message, ticketUnits } = this.state;
    if (!currentGroup) {
      return null;
    }

    return createMember(
      dispatch,
      currentGroup.id,
      auth,
      profile,
      message,
      ticketUnits
    ).then(() => {
      this.setState({ redirectTo: '/' });
    });
  };

  render() {
    const { classes, groups } = this.props;
    const { message, ticketUnits, redirectTo, currentGroup } = this.state;

    if (redirectTo) {
      return <Redirect to={redirectTo} />;
    }

    if (groups.isLoading || currentGroup === null) {
      return 'Loading..';
    }

    const mDateTime = moment(currentGroup.dateTime);
    const fDate = mDateTime.format('MMM Do');
    const fTimeStart = mDateTime.format('ha');
    const fTimeEnd = mDateTime.add(1, 'h').format('ha');

    return (
      <div className={classes.container}>
        <NSGroupFinderIcon size={100} />
        <Grid
          container
          className={classes.gridContainer}
          direction="row"
          alignItems="flex-start"
          justify="center"
        >
          <Grid item xs={12} sm={12} md={8}>
            <Card className={classes.card}>
              <CardHeader
                avatar={this.avatar}
                title={`Created By ${currentGroup.admin.displayName}`}
                action={this.infoAction}
              />
              <CardContent className={classes.cardContent}>
                <div className={classes.headerContainer}>
                  <Typography
                    type="display1"
                    gutterBottom
                    noWrap
                    className={classes.groupTitle}
                  >
                    {currentGroup.departureStation.name}
                    {' to '}
                    {currentGroup.arrivalStation.name}
                  </Typography>
                  <Typography type="subheading" gutterBottom noWrap>
                    {`${fDate}, ${fTimeStart} - ${fTimeEnd}`}
                  </Typography>
                </div>

                <TicketsProgress ticketUnits={currentGroup.ticketUnits} />

                <div className={classes.requestContainer}>
                  <Typography
                    type="title"
                    gutterBottom
                    noWrap
                    className={classes.groupTitle}
                  >
                    Interested By This Group ?
                  </Typography>

                  <Typography
                    type="body1"
                    paragraph
                    className={classes.requestInstructions}
                  >
                    Cupidatat anim quis dolor id. Dolor non qui cupidatat cillum
                    sunt veniam laborum veniam excepteur culpa eiusmod magna.
                    Excepteur sunt magna anim ex et dolor adipisicing pariatur
                    eu. Id quis irure sint do commodo nostrud mollit officia
                    quis. Aliquip dolore aliqua velit et.
                  </Typography>

                  <Grid container>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        margin="dense"
                        id="message"
                        label="Message"
                        helperText="A nice message for the creator of the group."
                        type="text"
                        fullWidth
                        onChange={this.handleChanges('message')}
                        value={message}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        margin="dense"
                        id="ticketUnits"
                        label="Number of Tickets"
                        type="number"
                        InputProps={{
                          inputProps: {
                            min: '1',
                            max: '6',
                          },
                        }}
                        fullWidth
                        onChange={this.handleChanges('ticketUnits')}
                        value={ticketUnits}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      {this.requestButton}
                    </Grid>
                  </Grid>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const styles = ({ spacing, breakpoints, typography }) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: spacing.unit * 4,
  },
  gridContainer: {
    paddingTop: spacing.unit * 4,
  },
  card: {
    padding: spacing.unit * 4,
  },
  cardContent: {
    textAlign: 'center',
  },
  headerContainer: {
    marginBottom: spacing.unit * 6,
  },
  requestContainer: {
    marginTop: spacing.unit * 4,
  },
  requestInstructions: {
    textAlign: 'left',
  },
  publicInfos: {
    marginTop: spacing.unit * 4,
  },
  [breakpoints.down('sm')]: {
    groupTitle: typography.title,
  },
});

const mapStateToProps = ({ groups, firebase: { auth, profile } }) => ({
  auth,
  groups,
  profile,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      dFetchGroups: fetchGroups,
      dFetchCurrentGroupMembers: fetchCurrentGroupMembers,
      dThrowAccentSnackbar: throwAccentSnackbar,
      dispatch,
    },
    dispatch
  );

export default compose(
  withFirebase,
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(ShareGroup);
