// @flow

import React from 'react';
import { withStyles } from 'material-ui/styles';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getFirebase } from 'react-redux-firebase';
import type { Group, GroupsState } from 'types/group';
import type { Member } from 'types/user';
import { logErrorIfDevEnv } from 'utils/env';
import { throwAccentSnackbar } from 'actions/snackbar';
import { Redirect } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import MembersTable from './MembersTable';
import AdminTabs from './AdminTabs';
import Header from './Header';

type Props = {
  classes: Object,
  match: {
    params: {
      id: string,
    },
  },
  groups: GroupsState,
  dThrowAccentSnackbar: Function,
  auth: Object,
};

type State = {
  isLoading: boolean,
  redirectToGroups: boolean,
  group: null | Group,
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
    isLoading: true,
    redirectToGroups: false,
    group: null,
    pendingMembers: [],
    confirmedMembers: [],
  };

  componentWillMount() {
    const { groups: { groups }, match: { params } } = this.props;
    const group = groups.find(g => g.id === params.id);

    if (group) {
      this.setState({ group });
      this.fetchMembers(group);
    } else {
      this.fetchGroup();
    }
  }

  db: Object;
  fetchGroup: Function;
  fetchMembers: Function;

  async fetchGroup() {
    const { match: { params }, dThrowAccentSnackbar } = this.props;
    const groupsRef = this.db.collection('groups');

    try {
      const snapshot = await groupsRef.doc(params.id).get();
      const fetchedGroup = { id: snapshot.id, ...snapshot.data() };
      this.setState({ group: fetchedGroup });
      this.fetchMembers(fetchedGroup);
    } catch (err) {
      logErrorIfDevEnv(err);
      dThrowAccentSnackbar('Ooops, this group does not exist.');
      this.setState({ isLoading: false, redirectToGroups: true });
    }
  }

  async fetchMembers(fetchedGroup: Group) {
    const { dThrowAccentSnackbar } = this.props;
    const membersRef = this.db.collection('members');
    const { id } = fetchedGroup;
    try {
      const snapshot = await membersRef.where('groupId', '==', id).get();
      const members: Member[] = snapshot.docs.map(m => ({
        id: m.id,
        ...m.data(),
      }));
      const pendingMembers = members.filter(
        member => member.status === 'pending'
      );
      const confirmedMembers = members.filter(
        member => member.status === 'admin' || member.status === 'confirmed'
      );
      this.setState({ isLoading: false, pendingMembers, confirmedMembers });
    } catch (err) {
      logErrorIfDevEnv(err);
      dThrowAccentSnackbar('Ooops, unable to get the members.');
      this.setState({ isLoading: false, redirectToGroups: true });
    }
  }

  render() {
    const { classes, auth } = this.props;
    const {
      isLoading,
      group,
      redirectToGroups,
      pendingMembers,
      confirmedMembers,
    } = this.state;
    if (isLoading) {
      return 'Loading..';
    }

    if (redirectToGroups || !group) {
      return <Redirect to="/my-groups" />;
    }

    const isAdmin = group.admin.uid === auth.uid;
    const memberCompletionTarget = 7;
    const memberCount = pendingMembers.length + confirmedMembers.length;

    return (
      <div className={classes.container}>
        <Header
          group={group}
          memberCompletionTarget={memberCompletionTarget}
          memberCount={memberCount}
        />
        <Paper>
          {isAdmin ? (
            <AdminTabs
              pendingMembers={pendingMembers}
              confirmedMembers={confirmedMembers}
              group={group}
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
  dThrowAccentSnackbar: throwAccentSnackbar,
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(ManageGroup);
