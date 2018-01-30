// @flow

import React from 'react';
import { withStyles } from 'material-ui/styles';
import PaidIcon from 'material-ui-icons/CheckCircle';
import NoPaidIcon from 'material-ui-icons/Cancel';
import Switch from 'material-ui/Switch';

type Props = {
  classes: Object,
  paid: boolean,
  isAdmin: boolean,
};

type State = {
  paid: boolean,
};

class PaymentIndicator extends React.Component<Props, State> {
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    paid: false,
  };

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.paid !== this.props.paid) {
      this.setState({ paid: nextProps.paid });
    }
  }

  handleChange: Function;

  handleChange() {
    this.setState(state => ({ paid: !state.paid }));
  }

  render() {
    const { classes, isAdmin } = this.props;
    const { paid } = this.state;

    if (isAdmin) {
      return (
        <Switch checked={paid} onChange={this.handleChange} aria-label="Paid" />
      );
    }

    return paid ? (
      <PaidIcon className={classes.paid} />
    ) : (
      <NoPaidIcon className={classes.noPaid} />
    );
  }
}

const styles = {
  paid: {},
  noPair: {},
};

export default withStyles(styles)(PaymentIndicator);
