// @flow

import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, getFirebase } from 'react-redux-firebase';
import { withStyles } from 'material-ui/styles';
import moment from 'moment';
import { throwDissmissSnackbar, throwAccentSnackbar } from 'actions/snackbar';
import { Redirect } from 'react-router-dom';
import { logErrorIfDevEnv } from 'utils/env';
import CreateGroupForm from './CreateGroupForm';

type Props = {
  classes?: Object,
  auth: Object,
  firestore: Object,
  dThrowDissmissSnackbar: Function,
  dThrowAccentSnackbar: Function,
};

type State = {
  redirect: boolean,
};

class CreateGroup extends React.Component<Props, State> {
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearData = this.clearData.bind(this);
  }

  state = {
    redirect: false,
  };

  handleSubmit: Function;
  clearData: Function;

  async handleSubmit(values: Object) {
    const {
      firestore,
      dThrowDissmissSnackbar,
      dThrowAccentSnackbar,
    } = this.props;

    const cleanPayload = this.clearData(values);
    try {
      await firestore.add('groups', cleanPayload);
      dThrowDissmissSnackbar('Your group has been successfully created !');
      this.setState({ redirect: true });
    } catch (err) {
      logErrorIfDevEnv(err);
      dThrowAccentSnackbar('Ooops, try again later please :/');
    }
  }

  clearData(values: Object): Object {
    const { auth, firestore } = this.props;
    const db = getFirebase().firestore();

    const admin = {
      avatarUrl: auth.photoURL,
      displayName: auth.displayName,
      email: auth.email,
      uid: auth.uid,
      ref: db.doc(`users/${auth.uid}`),
    };
    const {
      departure_obj: departure,
      arrival_obj: arrival,
      date,
      time,
      info = null,
    } = values;
    const departureStation = {
      name: departure.name,
      ref: db.doc(`/stations/${departure.code}`),
      id: departure.code,
    };
    const arrivalStation = {
      name: arrival.name,
      ref: db.doc(`/stations/${arrival.code}`),
      id: arrival.code,
    };
    const dateTime = moment(date)
      .hour(+time)
      .toDate();
    const createdAt = firestore.FieldValue.serverTimestamp();
    return {
      admin,
      departureStation,
      arrivalStation,
      dateTime,
      info,
      createdAt,
    };
  }

  render() {
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to="/" />;
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
