// @flow

import React from 'react';
import { withStyles } from 'material-ui/styles';
import CreateGroupForm from './CreateGroupForm';

type Props = {
  classes: Object,
};

type State = {};

class Component extends React.Component<Props, State> {
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit: Function;

  handleSubmit(values) {
    console.log(values);
  }

  render() {
    return <CreateGroupForm onSubmit={this.handleSubmit} />;
  }
}

const styles = {};

export default withStyles(styles)(Component);
