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
import Avatar from 'material-ui/Avatar';
import Checkbox from 'material-ui/Checkbox';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import { TextPopover } from 'common/containers';
import FacebookLink from './FacebookLink';

type Props = {
  classes: Object,
  pendingMembers: Member[],
};

type State = {
  checkboxes: Object,
};

class NewcommersTable extends React.Component<Props, State> {
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.getRow = this.getRow.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  state = {
    checkboxes: {},
  };

  componentWillMount() {
    const { pendingMembers } = this.props;
    const checkboxes = {};
    pendingMembers.forEach(member => {
      checkboxes[member.id] = false;
    });
    this.setState({ checkboxes });
  }

  getRow(member: Member): Node {
    const { classes } = this.props;
    const checkboxValue = this.state.checkboxes[member.id];
    return (
      <TableRow key={member.id} className={classes.row}>
        <TableCell>
          <div className={classes.profileContainer}>
            <Avatar
              className={classes.avatar}
              src={member.user.avatarUrl}
              alt={member.user.displayName}
            />
            <FacebookLink
              link="https://www.facebook.com/QuentinBross"
              name={member.user.displayName}
            />
          </div>
        </TableCell>
        <TableCell>
          <TextPopover>{member.message}</TextPopover>
        </TableCell>
        <TableCell>
          <Checkbox
            checked={checkboxValue}
            onChange={this.handleCheckboxChange(member.id)}
            value={member.id}
          />
        </TableCell>
      </TableRow>
    );
  }

  getRow: Function;
  handleCheckboxChange: Function;

  handleCheckboxChange(memberUid: string): Function {
    return () => {
      this.setState(({ checkboxes }) => ({
        checkboxes: { [memberUid]: !checkboxes[memberUid] },
      }));
    };
  }

  render() {
    const { classes, pendingMembers } = this.props;
    console.log(this.state.checkboxes);

    return (
      <div className={classes.container}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Facebook</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>Confirme</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{pendingMembers.map(this.getRow)}</TableBody>
        </Table>
        <Divider />
        <Button className={classes.button}>Send</Button>
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
  button: {
    margin: spacing.unit * 2,
    alignSelf: 'flex-end',
  },
});

export default withStyles(styles)(NewcommersTable);
