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
import { logErrorIfDevEnv, inDevEnv } from 'utils/env';
import type { Member } from 'types/user';
import type { Group, RequestStatus } from 'types/group';
import type Moment from 'moment';
import Grid from 'material-ui/Grid';
import GroupFilterForm from './GroupFilterForm';
import RulesCard from './RulesCard';
import ResultsDescription from './ResultsDescription';

type Props = {
  classes?: Object,
  firestore: Object,
  dThrowAccentSnackbar: Function,
  memberships: Member[],
};

type State = {
  results: Array<Object>,
  resultsDescrption: null | {
    departureStation: string,
    arrivalStation: string,
    startDate: Moment,
    endDate: Moment,
  },
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
    resultsDescrption: null,
  };

  getRequestStatus(currentGroupId: string): RequestStatus {
    const { memberships } = this.props;
    const isMemberToGroup = membership => membership.groupId === currentGroupId;
    const matchedMembership = memberships.find(isMemberToGroup);
    return matchedMembership ? matchedMembership.status : null;
  }

  handleSubmit: Function;
  getRequestStatus: Function;

  async handleSubmit(values) {
    const { firestore, dThrowAccentSnackbar } = this.props;
    const {
      departure_obj: { code: departureStationId, name: departureStationName },
      arrival_obj: { code: arrivalStationId, name: arrivalStationName },
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
        orderBy: ['dateTime', 'asc'],
      });
      const results = snapshot.docs.map(result => ({
        id: result.id,
        ...result.data(),
      }));
      this.setState({
        results,
        resultsDescrption: {
          departureStation: departureStationName,
          arrivalStation: arrivalStationName,
          startDate,
          endDate,
        },
      });
    } catch (err) {
      logErrorIfDevEnv(err);
      dThrowAccentSnackbar('Ooops, try again later please :/');
    }
  }

  render() {
    const { firestore } = this.props;
    const { results, resultsDescrption } = this.state;

    return (
      <div>
        <Grid container>
          <Grid item sm={12} xs={12}>
            <RulesCard />
          </Grid>
          <Grid item sm={12} xs={12}>
            <GroupFilterForm onSubmit={this.handleSubmit} />
          </Grid>
        </Grid>

        {inDevEnv() && (
          <button
            onClick={() => {
              firestore
                .get({
                  collection: 'groups',
                  where: [['obsolete', '>', new Date()]],
                })
                .then(s => {
                  const rs = s.docs.map(r => ({ id: r.id, ...r.data() }));
                  this.setState({ results: rs });
                });
            }}
          >
            Load all (debug)
          </button>
        )}

        {results.length > 0 ? (
          <div>
            <Typography variant="title">Groups</Typography>
            {resultsDescrption && <ResultsDescription {...resultsDescrption} />}
            <GroupCardContainer>
              {results.map((result: Group) => (
                <GroupCard
                  key={result.id}
                  group={result}
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
