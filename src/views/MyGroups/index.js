// @flow

import React from 'react';
import { withStyles } from 'material-ui/styles';
import { compose } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import Typography from 'material-ui/Typography';
import type { Member } from 'types/user';
import type { GroupsState, RequestStatus } from 'types/group';
import { GroupCardContainer } from 'common/components';
import { GroupCard } from 'common/containers';
import { fetchGroups } from 'actions/groups';

type Props = {
  classes: Object,
  memberships: Member[],
  dFetchGroups: Function,
  groups: GroupsState,
};

type State = {};

class MyGroups extends React.Component<Props, State> {
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.getRequestStatus = this.getRequestStatus.bind(this);
    this.fetchGroups = this.fetchGroups.bind(this);
  }

  state = {};

  componentWillMount() {
    const { memberships = [], groups: { groups } } = this.props;
    if (groups.length < memberships.length) {
      this.fetchGroups(memberships);
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    const { memberships: currentMemberships = [] } = this.props;
    const { memberships: nextMemberships = [] } = nextProps;

    if (currentMemberships.length < nextMemberships.length) {
      const newMemberships = _.differenceWith(
        nextMemberships,
        currentMemberships,
        _.isEqual
      );
      this.fetchGroups(newMemberships);
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

  fetchGroups(newMemberships: Member[]) {
    const { dFetchGroups } = this.props;

    newMemberships.forEach(async membership => {
      dFetchGroups(membership.groupId);
    });
  }

  render() {
    const { classes, groups: { groups, isLoading } } = this.props;

    if (isLoading) {
      return 'Loading...';
    }
    if (_.isEmpty(groups)) {
      return 'Empty';
    }
    return (
      <div>
        <Typography type="title" paragraph>
          My Groups
        </Typography>
        <GroupCardContainer>
          {groups.map(result => (
            <GroupCard
              key={result.id}
              id={result.id}
              admin={result.admin}
              stations={{
                departure: result.departureStation.name,
                arrival: result.arrivalStation.name,
              }}
              dateTime={result.dateTime}
              members={{
                current: 1,
                target: 7,
              }}
              info={result.info}
              pendingRequests={result.pendingRequests}
              requestStatus={this.getRequestStatus(result.id)}
            />
          ))}
        </GroupCardContainer>
      </div>
    );
  }
}

const styles = () => {};

const mapStateToProps = ({ firebase: { auth }, firestore, groups }) => ({
  auth,
  memberships: firestore.ordered.memberships,
  groups,
});

const mapDispatchToProps = {
  dFetchGroups: fetchGroups,
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(MyGroups);
