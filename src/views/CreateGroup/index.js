// @flow

import React from 'react';
import { withStyles } from 'material-ui/styles';

type Props = {
  classes: Object,
};

type State = {};

class CreateGroup extends React.Component<Props, State> {
  static defaultProps = {};
  render() {
    return 'CreateGroup';
  }
}

const styles = {};

export default withStyles(styles)(CreateGroup);
