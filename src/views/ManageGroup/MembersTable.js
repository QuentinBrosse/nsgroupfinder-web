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
import { updateMember } from 'actions/groups';
// import AdminActionsMenu from './AdminActionsMenu';
import PaymentIndicator from './PaymentIndicator';
import DateFromNow from './DateFromNow';

type Props = {
  classes: Object,
  confirmedMembers: Member[],
  isAdmin: boolean,
  dUpdateMember: Function,
};

type State = {};

class MembersTable extends React.Component<Props, State> {
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.getRow = this.getRow.bind(this);
    this.handlePaymentClick = this.handlePaymentClick.bind(this);
  }

  getRow(member: Member): Node {
    const { isAdmin, classes } = this.props;
    return (
      <TableRow key={member.id} className={classes.row}>
        <TableCell>
          <PaymentIndicator
            isAdmin={isAdmin}
            paid={member.paid}
            onClick={() => this.handlePaymentClick(member)}
          />
        </TableCell>
        <TableCell>{member.user.displayName}</TableCell>
        <TableCell>
          <DateFromNow dateTime={member.confirmedAt} />
        </TableCell>
        <TableCell numeric>{member.ticketUnits}</TableCell>
        {/* {isAdmin && (
          <TableCell>
            <AdminActionsMenu />
          </TableCell>
        )} */}
      </TableRow>
    );
  }

  getRow: Function;
  handlePaymentClick: Function;

  handlePaymentClick(member: Member) {
    const { dUpdateMember } = this.props;
    const changes = { paid: !member.paid };
    dUpdateMember(member.id, changes);
  }

  render() {
    const { classes, confirmedMembers } = this.props; // isAdmin
    return (
      <div className={classes.container}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Paid</TableCell>
              <TableCell>Facebook</TableCell>
              <TableCell>Confirmed</TableCell>
              <TableCell numeric>Tickets</TableCell>
              {/* {isAdmin && <TableCell>Actions</TableCell>} */}
            </TableRow>
          </TableHead>
          <TableBody>{confirmedMembers.map(this.getRow)}</TableBody>
        </Table>
      </div>
    );
  }
}

const styles = {
  container: {
    width: '100%',
    overflowX: 'auto',
  },
  row: {
    height: 60,
  },
};

const mapDispatchToProps = {
  dUpdateMember: updateMember,
};

export default compose(withStyles(styles), connect(null, mapDispatchToProps))(
  MembersTable
);
