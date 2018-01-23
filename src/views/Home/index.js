// @flow

import React from 'react';
import moment from 'moment';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import { GroupCard, GroupCardContainer } from 'common/components';
import GroupFilter from './GroupFilter';
import EmptyGroupResults from './EmptyGroupResults';
import GroupCardContainerFooter from './GroupCardContainerFooter';

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
    info:
      'Ullamco nostrud ipsum est ad ea commodo. Et fugiat nulla in dolor cillum Lorem laboris ut proident. Enim cupidatat sunt sint ex veniam duis qui enim. Consectetur eu ut occaecat elit in eiusmod nostrud aute eiusmod deserunt proident occaecat cillum adipisicing. Occaecat adipisicing duis amet culpa.',
  },
  {
    id: 3,
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
      current: 3,
      target: 4,
    },
  },
];

type Props = {
  classes?: Object,
};

type State = {};

class Home extends React.Component<Props, State> {
  static defaultProps = {
    classes: {},
  };

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit: Function;

  handleSubmit(values) {
    console.log(values);
  }

  render() {
    return (
      <div>
        <GroupFilter onSubmit={this.handleSubmit} />
        <Typography type="title" paragraph>
          Groups
        </Typography>
        {cards.length > 0 ? (
          <div>
            <GroupCardContainer>
              {cards.map(c => <GroupCard key={c.id} {...c} />)}
            </GroupCardContainer>
            <GroupCardContainerFooter />
          </div>
        ) : (
          <EmptyGroupResults />
        )}
      </div>
    );
  }
}

const styles = {};

export default withStyles(styles)(Home);
