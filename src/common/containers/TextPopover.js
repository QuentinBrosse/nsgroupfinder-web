// @flow

import React from 'react';
import type { Node } from 'react';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Popover from 'material-ui/Popover';
import Typography from 'material-ui/Typography';

type Props = {
  classes: Object,
  children: string,
  icon: Node,
};

type State = {
  popover: null | HTMLElement,
};

class TextPopover extends React.Component<Props, State> {
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  state = {
    popover: null,
  };

  handleClick: Function;
  handleClose: Function;

  handleClick(event) {
    event.persist();
    this.setState(({ popover }) => ({
      popover: popover ? null : event.target,
    }));
  }

  handleClose() {
    this.setState({ popover: null });
  }

  render() {
    const { classes, children, icon } = this.props;
    const { popover } = this.state;
    const popoverOpened = !!popover;
    return (
      <div>
        <IconButton disabled={!children} onClick={this.handleClick}>
          {icon}
        </IconButton>
        <Popover
          className={classes.popover}
          classes={{
            paper: classes.paper,
          }}
          open={popoverOpened}
          anchorEl={popover}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          onClose={this.handleClose}
        >
          <Typography type="body1">{children}</Typography>
        </Popover>
      </div>
    );
  }
}

const styles = ({ spacing }) => ({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: spacing.unit,
  },
});

export default withStyles(styles)(TextPopover);
