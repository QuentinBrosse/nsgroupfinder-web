// @flow

import React from 'react';
import { withStyles } from 'material-ui/styles';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getFirebase } from 'react-redux-firebase';
import type { Group, GroupsState } from 'types/group';
import { logErrorIfDevEnv } from 'utils/env';
import { throwAccentSnackbar } from 'actions/snackbar';
import { Redirect } from 'react-router-dom';

type Props = {
  classes: Object,
  match: {
    params: {
      id: string,
    },
  },
  groups: GroupsState,
  dThrowAccentSnackbar: Function,
};

type State = {
  isLoading: boolean,
  doNotExist: boolean,
  group: null | Group,
};

class ManageGroup extends React.Component<Props, State> {
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.fetchGroup = this.fetchGroup.bind(this);
  }

  state = {
    isLoading: true,
    doNotExist: false,
    group: null,
  };

  componentWillMount() {
    const { groups: { groups }, match: { params } } = this.props;
    const group = groups.find(g => g.id === params.id);

    if (group) {
      this.setState({ isLoading: false, group });
    } else {
      this.fetchGroup();
    }
  }

  fetchGroup: Function;

  async fetchGroup() {
    const { match: { params }, dThrowAccentSnackbar } = this.props;
    const db = getFirebase().firestore();
    const groupRef = db.collection('groups');

    try {
      const snapshot = await groupRef.doc(params.id).get();
      const fetchedGroup = { id: snapshot.id, ...snapshot.data() };
      this.setState({ isLoading: false, group: fetchedGroup });
    } catch (err) {
      logErrorIfDevEnv(err);
      dThrowAccentSnackbar('Ooops, this group does not exist.');
      this.setState({ isLoading: false, doNotExist: true });
    }
  }

  render() {
    const { isLoading, group, doNotExist } = this.state;
    if (isLoading) {
      return 'Loading..';
    }
    if (doNotExist) {
      return <Redirect to="/my-groups" />;
    }
    return <pre>{JSON.stringify(group)}</pre>;
  }
}

const styles = {};

const mapStateToProps = ({ groups }) => ({
  groups,
});

const mapDispatchToProps = {
  dThrowAccentSnackbar: throwAccentSnackbar,
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(ManageGroup);
