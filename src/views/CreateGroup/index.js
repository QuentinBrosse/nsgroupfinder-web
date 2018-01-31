// @flow

import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { withStyles } from 'material-ui/styles';
import moment from 'moment';
import { throwDissmissSnackbar, throwAccentSnackbar } from 'actions/snackbar';
import { Redirect } from 'react-router-dom';
import { logErrorIfDevEnv } from 'utils/env';
import { getUserFromAuth } from 'utils/user';
import CreateGroupForm from './CreateGroupForm';

type Props = {
  classes?: Object,
  auth: Object,
  firestore: Object,
  dThrowDissmissSnackbar: Function,
  dThrowAccentSnackbar: Function,
};

type State = {
  redirectTo: null | string,
};

class CreateGroup extends React.Component<Props, State> {
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearData = this.clearData.bind(this);
  }

  state = {
    redirectTo: null,
  };

  handleSubmit: Function;
  clearData: Function;

  async handleSubmit(values: Object) {
    const {
      firestore,
      auth,
      dThrowDissmissSnackbar,
      dThrowAccentSnackbar,
    } = this.props;

    const groupPayload = this.clearData(values);
    try {
      const { id: groupId } = await firestore.add('groups', groupPayload);
      const memberPayload = {
        user: getUserFromAuth(auth),
        groupId,
        adminUid: auth.uid,
        status: 'admin',
        message: null,
        createdAt: firestore.FieldValue.serverTimestamp(),
        obsolete: false,
        confirmedAt: firestore.FieldValue.serverTimestamp(),
        paid: false,
      };
      await firestore.add('members', memberPayload);
      dThrowDissmissSnackbar('Your group has been successfully created !');
      this.setState({ redirectTo: `group/${groupId}` });
    } catch (err) {
      logErrorIfDevEnv(err);
      dThrowAccentSnackbar('Ooops, try again later please :/');
    }
  }

  clearData(values: Object): Object {
    const { auth, firestore } = this.props;

    const {
      departure_obj: departure,
      arrival_obj: arrival,
      date,
      time,
      info = null,
    } = values;
    return {
      admin: getUserFromAuth(auth),
      departureStation: {
        name: departure.name,
        id: departure.code,
      },
      arrivalStation: {
        name: arrival.name,
        id: arrival.code,
      },
      dateTime: moment(date)
        .hour(+time)
        .toDate(),
      info,
      createdAt: firestore.FieldValue.serverTimestamp(),
      pendingRequests: 0,
    };
  }

  render() {
    const { redirectTo } = this.state;

    if (redirectTo) {
      return <Redirect to={redirectTo} />;
    }
    return <CreateGroupForm onSubmit={this.handleSubmit} />;
  }
}

const styles = {};

const mapPropsToState = ({ firebase }) => ({
  auth: firebase.auth,
});

const mapDispatchToProps = {
  dThrowDissmissSnackbar: throwDissmissSnackbar,
  dThrowAccentSnackbar: throwAccentSnackbar,
};

export default compose(
  withStyles(styles),
  firestoreConnect(),
  connect(mapPropsToState, mapDispatchToProps)
)(CreateGroup);
