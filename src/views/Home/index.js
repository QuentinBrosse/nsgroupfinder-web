// @flow

import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import moment from 'moment';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import {
  GroupCardContainer,
  EmptyGroupResults,
  GroupCardContainerFooter,
} from 'common/components';
import { GroupCard } from 'common/containers';
import { throwAccentSnackbar } from 'actions/snackbar';
import { logErrorIfDevEnv } from 'utils/env';
import type { Member } from 'types/user';
import type { RequestStatus } from 'types/group';
import GroupFilterForm from './GroupFilterForm';
import fakeCards from './fakeCards';

type Props = {
  classes?: Object,
  firestore: Object,
  dThrowAccentSnackbar: Function,
  memberships: Member[],
};

type State = {
  results: Array<Object>,
};

class Home extends React.Component<Props, State> {
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getRequestStatus = this.getRequestStatus.bind(this);
  }

  state = {
    results: [],
  };

  getRequestStatus(currentGroupId: string): RequestStatus {
    const { memberships } = this.props;
    const isMemberToGroup = membership => membership.groupId === currentGroupId;
    const matchedMembership = memberships.find(isMemberToGroup);
    return matchedMembership ? matchedMembership.status : null;
  }

  handleSubmit: Function;
  getRequestStatus: Function;

  fakeCards = false;

  async handleSubmit(values) {
    const { firestore, dThrowAccentSnackbar } = this.props;
    const {
      departure_obj: { code: departureStationId },
      arrival_obj: { code: arrivalStationId },
      date,
      start_time: startTime,
      end_time: endTime,
    } = values;
    const startDate = moment(date).hour(+startTime);
    const endDate = moment(date).hour(+endTime);
    if (endDate.isBefore(startDate)) {
      endDate.add(1, 'day');
    }
    try {
      const snapshot = await firestore.get({
        collection: 'groups',
        where: [
          ['departureStation.id', '==', departureStationId],
          ['arrivalStation.id', '==', arrivalStationId],
          ['dateTime', '>=', startDate.toDate()],
          ['dateTime', '<=', endDate.toDate()],
        ],
        orderBy: ['dateTime', 'desc'], // : cf #19
      });
      const results = snapshot.docs.map(result => ({
        id: result.id,
        ...result.data(),
      }));
      this.setState({ results });
    } catch (err) {
      logErrorIfDevEnv(err);
      dThrowAccentSnackbar('Ooops, try again later please :/');
    }
  }

  render() {
    const { firestore } = this.props;
    const { results } = this.state;

    return (
      <div>
        <GroupFilterForm onSubmit={this.handleSubmit} />

        <button
          onClick={() => {
            firestore.get('groups').then(s => {
              const rs = s.docs.map(r => ({ id: r.id, ...r.data() }));
              this.setState({ results: rs });
            });
          }}
        >
          Load all (debug)
        </button>

        {this.fakeCards && (
          <div>
            <Typography type="title" paragraph>
              Groups
            </Typography>
            {fakeCards}
          </div>
        )}

        {results.length > 0 ? (
          <div>
            <Typography type="title" paragraph>
              Groups
            </Typography>
            <GroupCardContainer>
              {results.map(result => (
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
            <GroupCardContainerFooter />
          </div>
        ) : (
          <EmptyGroupResults />
        )}
      </div>
    );
  }
}

const styles = {};

const mapStateToProps = ({ firestore: { ordered } }) => ({
  memberships: ordered.memberships,
});

const mapDispatchToProps = {
  dThrowAccentSnackbar: throwAccentSnackbar,
};

export default compose(
  withStyles(styles),
  firestoreConnect(),
  connect(mapStateToProps, mapDispatchToProps)
)(Home);
