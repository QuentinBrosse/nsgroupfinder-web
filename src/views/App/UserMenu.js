// @flow

import React from 'react';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import AccountCircle from 'material-ui-icons/AccountCircle';
import Menu, { MenuItem } from 'material-ui/Menu';
import { Link } from 'react-router-dom';
import LogOutMenuItem from './LogOutMenuItem';

type Props = {
  classes: Object,
};

type State = {
  anchorEl: HTMLElement | null,
};

class UserMenu extends React.Component<Props, State> {
  static defaultProps = {};

  constructor(props: Props) {
    super(props);
    this.handleMenu = this.handleMenu.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  state = {
    anchorEl: null,
  };

  handleMenu: Function;
  handleClose: Function;

  handleMenu(event: SyntheticEvent<*>) {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose() {
    this.setState({ anchorEl: null });
  }

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const menuIsOpen = !!anchorEl;
    return (
      <div className={classes.container}>
        <IconButton
          aria-owns={menuIsOpen ? 'user-menu-appbar' : null}
          aria-haspopup="true"
          onClick={this.handleMenu}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="user-menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={menuIsOpen}
          onClose={this.handleClose}
        >
          <MenuItem component={Link} onClick={this.handleClose} to="/my-groups">
            My Groups
          </MenuItem>
          <LogOutMenuItem />
        </Menu>
      </div>
    );
  }
}

const styles = {
  container: {},
};

export default withStyles(styles)(UserMenu);
