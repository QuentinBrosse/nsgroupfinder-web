// @flow

import React from 'react';
import { withStyles } from 'material-ui/styles';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getFirebase } from 'react-redux-firebase';
import type { GroupsState } from 'types/group';
import type { Member } from 'types/user';
import { throwAccentSnackbar } from 'actions/snackbar';
import { fetchGroups, fetchCurrentGroupMembers } from 'actions/groups';
import { Redirect } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import differenceWith from 'lodash/differenceWith';
import MembersTable from './MembersTable';
import AdminTabs from './AdminTabs';
import Header from './Header';

type Props = {
  classes: Object,
  match: {
    params: {
      groupId: string,
    },
  },
  groups: GroupsState,
  dFetchGroups: Function,
  dFetchCurrentGroupMembers: Function,
  dThrowAccentSnackbar: Function,
  auth: Object,
};

type State = {
  redirectTo: null | string,
  pendingMembers: Member[],
  confirmedMembers: Member[],
};

class ManageGroup extends React.Component<Props, State> {
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.db = getFirebase().firestore();
    this.fetchGroup = this.fetchGroup.bind(this);
    this.fetchMembers = this.fetchMembers.bind(this);
  }

  state = {
    redirectTo: null,
    pendingMembers: [],
    confirmedMembers: [],
  };

  componentWillMount() {
    const { groups: { groups }, match: { params } } = this.props;
    const groupIdx = groups.findIndex(g => g.id === params.groupId);

    if (groupIdx !== -1) {
      this.fetchMembers(params.groupId, groupIdx);
    } else {
      this.fetchGroup(params.groupId);
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    const { match: { params }, dThrowAccentSnackbar, auth } = this.props;
    const { groups } = this.props.groups;
    const { groups: nextGroups } = nextProps.groups;
    const { members } = this.props.groups.currentGroup;
    const nextMembers = nextProps.groups.currentGroup.members;

    // If new group
    const nonexistentInGroups =
      groups.findIndex(g => g.id === params.groupId) === -1;
    if (nonexistentInGroups) {
      const nextGroupIdx = nextGroups.findIndex(g => g.id === params.groupId);
      const existantInNextGroups = nextGroupIdx > -1;
      if (existantInNextGroups) {
        this.fetchMembers(params.groupId, nextGroupIdx);
        return;
      }
    }

    // If new members
    const membersDiff = differenceWith(nextMembers, members);
    if (membersDiff.length > 0) {
      if (nextMembers.find(m => m.user.uid === auth.uid) === undefined) {
        dThrowAccentSnackbar('You are not member of this group.');
        this.setState({ redirectTo: '/my-groups' });
        return;
      }
      const pendingMembers = nextMembers.filter(
        member => member.status === 'pending'
      );
      const confirmedMembers = nextMembers.filter(
        member => member.status === 'admin' || member.status === 'confirmed'
      );
      this.setState({ pendingMembers, confirmedMembers });
      return;
    }

    // Group Fetching
    if (nextProps.groups.error) {
      if (nextProps.groups.error === 404) {
        dThrowAccentSnackbar('This group does not exist.');
      } else {
        dThrowAccentSnackbar('Unable to fetch group.');
      }
      this.setState({ redirectTo: '/my-groups' });
    }

    // Member fetching
    if (nextProps.groups.currentGroup.error) {
      dThrowAccentSnackbar('Unable to fetch group members.');
      this.setState({ redirectTo: '/my-groups' });
    }
  }

  db: Object;
  fetchGroup: Function;
  fetchMembers: Function;

  fetchGroup(groupId: string) {
    this.props.dFetchGroups([groupId]);
  }

  async fetchMembers(groupId: string, groupIdx) {
    this.props.dFetchCurrentGroupMembers(groupId, groupIdx);
  }

  render() {
    const { classes, auth, groups } = this.props;
    const { redirectTo, pendingMembers, confirmedMembers } = this.state;

    if (redirectTo) {
      return <Redirect to={redirectTo} />;
    }

    if (
      groups.isLoading ||
      groups.currentGroup.isLoading ||
      groups.currentGroup.groupIdx === null
    ) {
      return 'Loading..';
    }

    const currentGroup = groups.groups[groups.currentGroup.groupIdx];
    const isAdmin = currentGroup.admin.uid === auth.uid;

    return (
      <div className={classes.container}>
        <Header group={currentGroup} />
        <Paper>
          {isAdmin ? (
            <AdminTabs
              pendingMembers={pendingMembers}
              confirmedMembers={confirmedMembers}
              group={currentGroup}
            />
          ) : (
            <MembersTable isAdmin={false} confirmedMembers={confirmedMembers} />
          )}
        </Paper>
      </div>
    );
  }
}

const styles = {};

const mapStateToProps = ({ groups, firebase: { auth } }) => ({
  auth,
  groups,
});

const mapDispatchToProps = {
  dFetchGroups: fetchGroups,
  dFetchCurrentGroupMembers: fetchCurrentGroupMembers,
  dThrowAccentSnackbar: throwAccentSnackbar,
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(ManageGroup);
