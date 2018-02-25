// @flow

import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import moment from 'moment';
import { throwDissmissSnackbar, throwAccentSnackbar } from 'actions/snackbar';
import { Redirect } from 'react-router-dom';
import { logErrorIfDevEnv } from 'utils/env';
import { getUserFromAuth } from 'utils/user';
import type { Member } from 'types/user';
import CreateGroupForm from './CreateGroupForm';

type Props = {
  auth: Object,
  profile: Member,
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
    this.prepareGroup = this.prepareGroup.bind(this);
  }

  state = {
    redirectTo: null,
  };

  handleSubmit: Function;
  prepareGroup: Function;

  async handleSubmit(values: Object) {
    const {
      firestore,
      auth,
      profile,
      dThrowDissmissSnackbar,
      dThrowAccentSnackbar,
    } = this.props;

    const groupPayload = this.prepareGroup(values);
    try {
      const { id: groupId } = await firestore.add('groups', groupPayload);
      const memberPayload = {
        user: getUserFromAuth(auth, profile),
        groupId,
        adminUid: auth.uid,
        status: 'admin',
        message: null,
        createdAt: firestore.FieldValue.serverTimestamp(),
        obsolete: groupPayload.obsolete,
        statusUpdatedAt: firestore.FieldValue.serverTimestamp(),
        paid: false,
        ticketUnits: groupPayload.ticketUnits,
      };
      await firestore.add('members', memberPayload);
      dThrowDissmissSnackbar('Your group has been successfully created !');
      this.setState({ redirectTo: `group/${groupId}` });
    } catch (err) {
      logErrorIfDevEnv(err);
      dThrowAccentSnackbar('Ooops, try again later please :/');
    }
  }

  prepareGroup(values: Object): Object {
    const { auth, profile, firestore } = this.props;

    const {
      departure_obj: departure,
      arrival_obj: arrival,
      date,
      time,
      public_info: publicInfo = null,
      private_info: privateInfo = null,
    } = values;
    const dateTime = moment(date).hour(+time);
    return {
      admin: getUserFromAuth(auth, profile),
      departureStation: {
        name: departure.name,
        id: departure.code,
      },
      arrivalStation: {
        name: arrival.name,
        id: arrival.code,
      },
      dateTime: dateTime.toDate(),
      publicInfo,
      privateInfo,
      createdAt: firestore.FieldValue.serverTimestamp(),
      pendingRequests: 0,
      ticketUnits: parseInt(values.ticketUnits, 10),
      obsolete: dateTime.add(1, 'hour').toDate(),
      membersUids: [auth.uid],
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

const mapPropsToState = ({ firebase }) => ({
  auth: firebase.auth,
  profile: firebase.profile,
});

const mapDispatchToProps = {
  dThrowDissmissSnackbar: throwDissmissSnackbar,
  dThrowAccentSnackbar: throwAccentSnackbar,
};

export default compose(
  firestoreConnect(),
  connect(mapPropsToState, mapDispatchToProps)
)(CreateGroup);
