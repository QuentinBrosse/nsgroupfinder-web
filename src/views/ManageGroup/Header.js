// @flow

import React from 'react';
import type { Group } from 'types/group';
import { withStyles } from 'material-ui/styles';
import Card, { CardHeader, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import ShareIcon from 'material-ui-icons/Share';
import TicketsProgess from 'common/components/TicketsProgress';
import moment from 'moment';
import ShareDialog from './ShareDialog';

type Props = {
  classes: Object,
  group: Group,
};

type State = {
  shareDialogOpened: boolean,
};

class Header extends React.Component<Props, State> {
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      shareDialogOpened: false,
    };
  }

  manageShareDialog = (opened?: boolean) => () => {
    this.setState(state => ({
      shareDialogOpened:
        opened !== undefined ? opened : !state.shareDialogOpened,
    }));
  };

  render() {
    const { classes, group } = this.props;
    const { shareDialogOpened } = this.state;
    const mDateTime = moment(group.dateTime);
    const fDate = mDateTime.format('MMM Do');
    const fTimeStart = mDateTime.format('ha');
    const fTimeEnd = mDateTime.add(1, 'h').format('ha');
    return (
      <Card className={classes.card}>
        <CardHeader
          action={
            <Button
              className={classes.button}
              onClick={this.manageShareDialog()}
              variant="raised"
              color="secondary"
            >
              <Typography variant="button" color="primary">
                Share
              </Typography>
              <ShareIcon color="primary" className={classes.rightIcon} />
            </Button>
          }
          title={`${group.departureStation.name} to ${
            group.arrivalStation.name
          }`}
          subheader={`${fDate}, ${fTimeStart} - ${fTimeEnd}`}
        />
        <CardContent>
          <Typography variant="subheading">Public Info</Typography>
          <Typography component="p" paragraph>
            {group.publicInfo}
          </Typography>
          <Typography variant="subheading">Private Info</Typography>
          <Typography component="p" paragraph>
            {group.privateInfo}
          </Typography>
          <div className={classes.progressContaier}>
            <TicketsProgess ticketUnits={group.ticketUnits} />
          </div>
        </CardContent>
        <ShareDialog
          opened={shareDialogOpened}
          onClose={this.manageShareDialog(false)}
          groupId={group.id}
        />
      </Card>
    );
  }
}

const styles = ({ spacing }) => ({
  card: {
    marginBottom: spacing.unit * 2,
  },
  progressContaier: {
    marginTop: spacing.unit * 4,
  },
  button: {
    margin: spacing.unit,
    marginRight: spacing.unit * 2,
  },
  rightIcon: {
    marginLeft: spacing.unit,
  },
});

export default withStyles(styles)(Header);
