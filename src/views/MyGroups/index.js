// @flow

import React from 'react';
import { withStyles } from 'material-ui/styles';
import { compose } from 'redux';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import Typography from 'material-ui/Typography';
import type { Member } from 'types/user';
import type { Group, GroupsState, RequestStatus } from 'types/group';
import { GroupCardContainer } from 'common/components';
import { GroupCard } from 'common/containers';
import { fetchGroups } from 'actions/groups';
import { throwAccentSnackbar } from 'actions/snackbar';
import { Redirect } from 'react-router-dom';

type Props = {
  classes: Object,
  memberships: Member[],
  dFetchGroups: Function,
  dThrowAccentSnackbar: Function,
  groups: GroupsState,
};

type State = {
  redirectTo: null | string,
};

class MyGroups extends React.Component<Props, State> {
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.getRequestStatus = this.getRequestStatus.bind(this);
    this.fetchGroups = this.fetchGroups.bind(this);
  }

  state = {
    redirectTo: null,
  };

  componentWillMount() {
    const { memberships = [], groups } = this.props;

    if (
      !groups.isLoading &&
      !groups.error &&
      memberships.length > groups.groups.length
    ) {
      this.fetchGroups(memberships);
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    const {
      groups: nextGroups,
      memberships: nextMemberships = [],
      dThrowAccentSnackbar,
    } = nextProps;

    if (
      !nextGroups.isLoading &&
      !nextGroups.error &&
      nextMemberships.length > nextGroups.groups.length
    ) {
      this.fetchGroups(nextMemberships);
      return;
    }

    if (nextGroups.error) {
      dThrowAccentSnackbar('Unable to fetch groups..');
      this.setState({ redirectTo: '/' });
    }
  }

  getRequestStatus(currentGroupId: string): RequestStatus {
    const { memberships } = this.props;
    const isMemberToGroup = membership => membership.groupId === currentGroupId;
    const matchedMembership = memberships.find(isMemberToGroup);
    return matchedMembership ? matchedMembership.status : null;
  }

  getRequestStatus: Function;
  fetchGroups: Function;

  fetchGroups(memberships: Member[] = []) {
    const groupIds = memberships.map(m => m.groupId);
    this.props.dFetchGroups(groupIds);
  }

  render() {
    const { classes, groups: { groups, isLoading } } = this.props;
    const { redirectTo } = this.state;

    if (redirectTo) {
      return <Redirect to={redirectTo} />;
    }

    if (isLoading) {
      return 'Loading...';
    }

    if (isEmpty(groups)) {
      return 'Empty';
    }

    return (
      <div className={classes.container}>
        <Typography type="title" paragraph>
          My Groups
        </Typography>
        <GroupCardContainer>
          {groups.map((result: Group) => (
            <GroupCard
              key={result.id}
              group={result}
              requestStatus={this.getRequestStatus(result.id)}
            />
          ))}
        </GroupCardContainer>
      </div>
    );
  }
}

const styles = {
  container: {},
};

const mapStateToProps = ({ firebase: { auth }, firestore, groups }) => ({
  auth,
  memberships: firestore.ordered.memberships,
  groups,
});

const mapDispatchToProps = {
  dFetchGroups: fetchGroups,
  dThrowAccentSnackbar: throwAccentSnackbar,
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(MyGroups);
