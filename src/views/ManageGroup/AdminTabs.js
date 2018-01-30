// @flow

import React from 'react';
import { withStyles } from 'material-ui/styles';
import Tabs, { Tab } from 'material-ui/Tabs';
import Badge from 'material-ui/Badge';
import MembersIcon from 'material-ui-icons/GroupWork';
import NewcomersIcon from 'material-ui-icons/Star';
import SettingsIcon from 'material-ui-icons/Settings';
import type { Member } from 'types/user';
import type { Group } from 'types/group';
import MembersTable from './MembersTable';
import NewcommersTable from './NewcommersTable';
import GroupPreferences from './GroupPreferences';

type Props = {
  classes: Object,
  pendingMembers: Member[],
  confirmedMembers: Member[],
  group: Group,
};

type State = {
  tabIdx: number,
};

class AdminTabs extends React.Component<Props, State> {
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    tabIdx: 0,
  };

  get newcommersIcon() {
    const { classes, pendingMembers } = this.props;
    const pendingMembersCount = pendingMembers.length;
    if (pendingMembersCount > 0) {
      return (
        <Badge
          classes={{ badge: classes.badge }}
          badgeContent={pendingMembersCount}
        >
          <NewcomersIcon />
        </Badge>
      );
    }
    return <NewcomersIcon />;
  }

  handleChange: Function;

  handleChange(event: Event, tabIdx: number) {
    this.setState({ tabIdx });
  }

  render() {
    const { pendingMembers, confirmedMembers, group, classes } = this.props;
    const { tabIdx } = this.state;
    return (
      <div>
        <Tabs
          value={tabIdx}
          onChange={this.handleChange}
          centered
          fullWidth
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab
            classes={{ labelContainer: classes.labelContainer }}
            icon={<MembersIcon />}
            label="Members"
          />
          <Tab
            classes={{ labelContainer: classes.labelContainer }}
            icon={this.newcommersIcon}
            label="Newcommers"
            disabled={pendingMembers.length === 0}
          />
          <Tab
            classes={{ labelContainer: classes.labelContainer }}
            icon={<SettingsIcon />}
            label="Preferences"
          />
        </Tabs>
        {tabIdx === 0 && (
          <MembersTable isAdmin confirmedMembers={confirmedMembers} />
        )}
        {tabIdx === 1 && <NewcommersTable pendingMembers={pendingMembers} />}
        {tabIdx === 2 && <GroupPreferences group={group} />}
      </div>
    );
  }
}

const styles = ({ breakpoints, palette }) => ({
  [breakpoints.down('xs')]: {
    labelContainer: {
      display: 'none',
    },
  },
  badge: {
    color: palette.error.main,
  },
});

export default withStyles(styles)(AdminTabs);