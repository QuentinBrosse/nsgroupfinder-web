// @flow

import React from 'react';
import { withStyles } from 'material-ui/styles';
import { compose } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { firestoreConnect, getFirebase } from 'react-redux-firebase';
import Typography from 'material-ui/Typography';
import type { Member } from 'types/user';
import type { Group, RequestStatus } from 'types/group';
import { GroupCardContainer } from 'common/components';
import { GroupCard } from 'common/containers';
import { logErrorIfDevEnv } from 'utils/env';

type Props = {
  classes: Object,
  firestore: Object,
  memberships: Member[],
};

type State = {
  groups: Group[],
};

class MyGroups extends React.Component<Props, State> {
  static defaultProps = {};

  constructor(props) {
    super(props);
    const db = getFirebase().firestore();
    this.groupRef = db.collection('groups');

    this.getRequestStatus = this.getRequestStatus.bind(this);
    this.fetchGroups = this.fetchGroups.bind(this);
  }

  state = {
    groups: [],
  };

  componentWillMount() {
    const { memberships = [] } = this.props;
    this.fetchGroups(memberships);
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

  groupRef: Object;
  getRequestStatus: Function;
  fetchGroups: Function;

  fetchGroups(newMemberships: Member[]) {
    newMemberships.forEach(async membership => {
      const snapshot = await this.groupRef.doc(membership.groupId).get();
      try {
        if (snapshot.exists) {
          const group = { id: snapshot.id, ...snapshot.data() };
          this.setState(state => ({
            groups: [...state.groups, group],
          }));
        }
      } catch (err) {
        logErrorIfDevEnv(err);
      }
    });
  }

  render() {
    const { classes } = this.props;
    const { groups } = this.state;

    if (groups.length === 0) {
      return 'Loading...';
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

const mapStateToProps = ({ firebase: { auth }, firestore }) => ({
  auth,
  memberships: firestore.ordered.memberships,
});

export default compose(
  firestoreConnect(),
  withStyles(styles),
  connect(mapStateToProps)
)(MyGroups);
