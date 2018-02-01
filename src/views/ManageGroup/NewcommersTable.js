// @flow

import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import type { Node } from 'react';
import type { Member } from 'types/user';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from 'material-ui/Table';
import Avatar from 'material-ui/Avatar';
import { TextPopover } from 'common/containers';
import ConfirmIcon from 'material-ui-icons/Check';
import RejectIcon from 'material-ui-icons/Close';
import { updateMemberStatus } from 'actions/groups';
import ConfirmationButton from './ConfirmationButton';

type Props = {
  classes: Object,
  pendingMembers: Member[],
  changeTab: Function,
  dUpdateMemberStatus: Function,
};

type State = {};

class NewcommersTable extends React.Component<Props, State> {
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.getRow = this.getRow.bind(this);
  }

  state = {};

  componentWillReceiveProps(nextProps) {
    if (nextProps.pendingMembers.length === 0) {
      this.props.changeTab(0);
    }
  }

  getRow(member: Member): Node {
    const { classes, dUpdateMemberStatus } = this.props;
    return (
      <TableRow key={member.id} className={classes.row}>
        <TableCell>
          <div className={classes.profileContainer}>
            <Avatar
              className={classes.avatar}
              src={member.user.avatarUrl}
              alt={member.user.displayName}
            />
            {member.user.displayName}
          </div>
        </TableCell>
        <TableCell>
          <TextPopover>{member.message}</TextPopover>
        </TableCell>
        <TableCell numeric>{member.ticketUnits}</TableCell>
        <TableCell className={classes.actionCell}>
          <ConfirmationButton
            tooltipTitle="Confirm"
            memberId={member.id}
            onClick={() => dUpdateMemberStatus(member.id, 'confirmed')}
          >
            <ConfirmIcon />
          </ConfirmationButton>
          <ConfirmationButton
            tooltipTitle="Refuse"
            memberId={member.id}
            onClick={() => dUpdateMemberStatus(member.id, 'refused')}
          >
            <RejectIcon />
          </ConfirmationButton>
        </TableCell>
      </TableRow>
    );
  }

  getRow: Function;

  render() {
    const { classes, pendingMembers } = this.props;

    return (
      <div className={classes.container}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Facebook</TableCell>
              <TableCell>Message</TableCell>
              <TableCell numeric>Tickets</TableCell>
              <TableCell className={classes.actionCell}>Confirmation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{pendingMembers.map(this.getRow)}</TableBody>
        </Table>
      </div>
    );
  }
}

const styles = ({ spacing }) => ({
  container: {
    width: '100%',
    overflowX: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  profileContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    height: 30,
    width: 30,
    marginRight: spacing.unit,
  },
  row: {
    height: 60,
  },
  messageContainer: {
    maxWidth: '50%',
  },
  actionCell: {
    textAlign: 'center',
    whiteSpace: 'nowrap',
  },
});

const mapDispatchToProps = {
  dUpdateMemberStatus: updateMemberStatus,
};

export default compose(withStyles(styles), connect(null, mapDispatchToProps))(
  NewcommersTable
);
