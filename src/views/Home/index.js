// @flow

import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import moment from 'moment';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import { GroupCard, GroupCardContainer } from 'common/components';
import { throwAccentSnackbar } from 'actions/snackbar';
import GroupFilterForm from './GroupFilterForm';
import EmptyGroupResults from './EmptyGroupResults';
import GroupCardContainerFooter from './GroupCardContainerFooter';

type Props = {
  classes?: Object,
  firestore: Object,
  dThrowAccentSnackbar: Function,
};

type State = {
  results: Array<Object>,
};

class Home extends React.Component<Props, State> {
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    results: [],
  };

  handleSubmit: Function;

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
        // orderBy: ['dateTime', 'desc'], : cf #19
      });
      const results = snapshot.docs.map(result => ({
        id: result.id,
        ...result.data(),
      }));
      this.setState({ results });
    } catch (err) {
      dThrowAccentSnackbar('Ooops, try again later please :/');
    }
  }

  render() {
    const { results } = this.state;
    return (
      <div>
        <GroupFilterForm onSubmit={this.handleSubmit} />
        <Typography type="title" paragraph>
          Groups
        </Typography>
        {results.length > 0 ? (
          <div>
            <GroupCardContainer>
              {results.map(result => (
                <GroupCard
                  key={result.id}
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

const mapDispatchToProps = {
  dThrowAccentSnackbar: throwAccentSnackbar,
};

export default compose(
  withStyles(styles),
  firestoreConnect(),
  connect(null, mapDispatchToProps)
)(Home);
