// @flow

import React from 'react';
import { withStyles } from 'material-ui/styles';
import type { Node } from 'react';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import { CircularProgress } from 'material-ui/Progress';

type Props = {
  classes: Object,
  memberId: string,
  children: Node,
  onClick: Function,
  tooltipTitle: string,
};

type State = {
  loading: boolean,
};

class ConfirmationButton extends React.Component<Props, State> {
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  state = {
    loading: false,
  };

  handleClick: Function;

  handleClick() {
    this.setState({ loading: true });
    this.props.onClick();
  }

  render() {
    const { classes, children, tooltipTitle, memberId } = this.props;
    const { loading } = this.state;
    return (
      <div className={classes.container}>
        <IconButton onClick={this.handleClick}>
          <Tooltip id={`tooltipConfirm${memberId}`} title={tooltipTitle}>
            {children}
          </Tooltip>
        </IconButton>
        {loading && <CircularProgress size={30} className={classes.progress} />}
      </div>
    );
  }
}

const styles = {
  container: {
    position: 'relative',
    display: 'inline-block',
  },
  progress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -17,
    marginLeft: -15,
  },
};

export default withStyles(styles)(ConfirmationButton);
