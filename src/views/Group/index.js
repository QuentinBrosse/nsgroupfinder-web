// @flow

import React from 'react';
import { withStyles } from 'material-ui/styles';

type Props = {
  classes: Object,
  match: {
    params: {
      id: string,
    },
  },
};

type State = {};

class Group extends React.Component<Props, State> {
  static defaultProps = {};

  render() {
    const { match: { params } } = this.props;
    return `Group ${params.id}`;
  }
}

const styles = {};

export default withStyles(styles)(Group);
