// @flow

import React from 'react';
import { withStyles } from 'material-ui/styles';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { updateMemberStatus } from 'actions/groups';
import ActionIcon from 'material-ui-icons/MoreVert';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import type { Member } from 'types/user';

type Props = {
  classes: Object,
  isAdmin: boolean,
  member: Member,
  dUpdateMemberStatus: Function,
};

type State = {
  menuAnchorEl: HTMLElement | null,
  dialogOpen: boolean,
};

class MembersTableActionsMenu extends React.Component<Props, State> {
  static defaultProps = {};

  constructor(props: Props) {
    super(props);
    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.rejectMember = this.rejectMember.bind(this);
  }

  state = {
    menuAnchorEl: null,
    dialogOpen: false,
  };

  openMenu: Function;
  closeMenu: Function;
  openDialog: Function;
  closeDialog: Function;
  rejectMember: Function;

  openMenu(event: SyntheticEvent<*>) {
    this.setState({ menuAnchorEl: event.currentTarget });
  }

  closeMenu() {
    this.setState({ menuAnchorEl: null });
  }

  openDialog() {
    this.setState({ dialogOpen: true });
  }

  closeDialog() {
    this.setState({ dialogOpen: false });
  }

  rejectMember() {
    const { member, dUpdateMemberStatus } = this.props;
    dUpdateMemberStatus(member.id, 'refused');
    this.closeMenu();
  }

  render() {
    const { menuAnchorEl, dialogOpen } = this.state;
    const { classes, isAdmin, member } = this.props;
    const menuIsOpen = !!menuAnchorEl;
    if (member.adminUid === member.user.uid) {
      return null;
    }
    return (
      <div>
        <IconButton onClick={this.openMenu} aria-label="Actions">
          <ActionIcon />
        </IconButton>
        <Menu
          id={`adminActionMenu${member.id}`}
          anchorEl={menuAnchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={menuIsOpen}
          onClose={this.closeMenu}
        >
          <MenuItem onClick={this.openDialog}>
            {isAdmin ? 'Delete Member' : 'Leave Group'}
          </MenuItem>
        </Menu>
        <Dialog
          open={dialogOpen}
          onClose={this.closeDialog}
          aria-labelledby={`alertDialogTitleRejectMember${member.id}`}
          aria-describedby={`alertDialogDescriptionRejectMember${member.id}`}
        >
          <DialogTitle id={`alertDialogTitleRejectMember${member.id}`}>
            {isAdmin
              ? `Do you realy want to reject ${member.user.displayName} ?`
              : `Do you realy want to leave the group ?`}
          </DialogTitle>
          <DialogContent>
            <div
              className={classes.dialogContentText}
              id={`alertDialogDescriptionRejectMember${member.id}`}
            >
              {isAdmin ? (
                <div>
                  <p>
                    This action is <u>irremediable</u> and you can not inform
                    the member of the reason of the rejection for the moment.
                  </p>
                  <p>Be fair-play, reject him only if:</p>
                  <ul>
                    <li>He does not want to pay his ticket</li>
                    <li>He does not want to travel in this group anymore</li>
                    <li>He does not behave appropriately</li>
                  </ul>
                </div>
              ) : (
                <div>
                  <p>
                    This action is <u>irremediable</u>, you can not inform the
                    lead booker (admin) of your leaving reason for the moment.
                  </p>
                  <p>Be fair-play:</p>
                  <ul>
                    <li>
                      Keep in mind that leaving a group shortly before the day
                      of departure <u>could be very disturbing</u> for the group
                      organization.
                    </li>
                    <li>
                      Leave groups <u>as rarely as possible</u>
                    </li>
                    <li>Try to inform the lead booker of your leaving</li>
                  </ul>
                </div>
              )}
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeDialog} color="secondary">
              Cancel
            </Button>
            <Button onClick={this.rejectMember} color="primary" autoFocus>
              {isAdmin ? 'Reject' : 'Leave'}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const styles = ({ typography, palette }) => ({
  dialogContentText: {
    ...typography.subheading,
    color: palette.text.secondary,
    margin: 0,
  },
});

const mapDispatchToProps = {
  dUpdateMemberStatus: updateMemberStatus,
};

export default compose(withStyles(styles), connect(null, mapDispatchToProps))(
  MembersTableActionsMenu
);
