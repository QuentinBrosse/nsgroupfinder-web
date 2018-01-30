// @flow

import React from 'react';
import { withStyles } from 'material-ui/styles';
import type { Node } from 'react';
import type { Member } from 'types/user';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from 'material-ui/Table';
import AdminActionsMenu from './AdminActionsMenu';
import PaymentIndicator from './PaymentIndicator';
import FacebookLink from './FacebookLink';
import DateFromNow from './DateFromNow';

type Props = {
  classes: Object,
  confirmedMembers: Member[],
  isAdmin: boolean,
};

type State = {};

class MembersTable extends React.Component<Props, State> {
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.getRow = this.getRow.bind(this);
  }

  getRow(member: Member): Node {
    const { isAdmin, classes } = this.props;
    return (
      <TableRow key={member.id} className={classes.row}>
        <TableCell>
          <PaymentIndicator isAdmin={isAdmin} paid={member.paid} />
        </TableCell>
        <TableCell>
          <FacebookLink
            link="https://www.facebook.com/QuentinBross"
            name={member.user.displayName}
          />
        </TableCell>
        <TableCell>
          <DateFromNow dateTime={member.confirmedAt} />
        </TableCell>
        {isAdmin && (
          <TableCell>
            <AdminActionsMenu />
          </TableCell>
        )}
      </TableRow>
    );
  }

  getRow: Function;

  render() {
    const { classes, confirmedMembers, isAdmin } = this.props;
    return (
      <div className={classes.container}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Paid</TableCell>
              <TableCell>Facebook</TableCell>
              <TableCell>Confirmed</TableCell>
              {isAdmin && <TableCell>Actions</TableCell>}
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

export default withStyles(styles)(MembersTable);
