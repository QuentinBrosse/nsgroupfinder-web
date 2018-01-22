// @flow

import React from 'react';
import type { Node } from 'react';
import moment from 'moment';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import { GroupCard, GroupCardContainer } from 'common/components';
import GroupFilter from './GroupFilter';

type Props = {
  classes: Object,
};

const cards = [
  {
    id: 1,
    stations: {
      departure: 'Groningen',
      arrival: 'Amsterdam',
    },
    date: moment('2013-02-08'),
    time: {
      start: moment('2013-02-08T09'),
      end: moment('2013-02-08T09').add(1, 'h'),
    },
    members: {
      current: 4,
      target: 7,
    },
    info: 'Voluptate Lorem fugiat non proident do non.',
  },
  {
    id: 2,
    stations: {
      departure: 'Amsterdam',
      arrival: 'Paris',
    },
    date: moment('2018-01-21'),
    time: {
      start: moment('2018-01-21T19'),
      end: moment('2018-01-21T19').add(1, 'h'),
    },
    members: {
      current: 6,
      target: 7,
    },
    info: 'Adipisicing id laborum eiusmod ex est.',
  },
];

const Home = ({ classes }: Props): Node => (
  <div>
    <GroupFilter className={classes.groupFilter} />
    <Typography type="title" paragraph>
      Groups
    </Typography>
    <GroupCardContainer>
      {cards.map(c => <GroupCard key={c.id} {...c} />)}
    </GroupCardContainer>
  </div>
);

Home.defaultProps = {};

const styles = theme => ({
  groupFilter: {
    marginBottom: theme.spacing.unit * 4,
  },
});

export default withStyles(styles)(Home);
