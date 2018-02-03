// @flow

import React from 'react';
import type { Node } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import { ButtonIcon } from 'common/components';

type Props = {
  classes: Object,
};

const EmptyGroupResults = ({ classes }: Props): Node => (
  <div className={classes.container}>
    <Typography
      type="subheading"
      align="center"
      headlineMapping={{ subheading: 'p' }}
      color="textSecondary"
    >
      No group was found for these criteria..{' '}
      <span role="img" aria-label="Sad emojy">
        😔
      </span>
      <br />
      Create your own !{' '}
      <span role="img" aria-label="Strong emojy">
        💪
      </span>
    </Typography>
    <ButtonIcon iconName="add" component={Link} to="/create-group">
      Create a Group
    </ButtonIcon>
  </div>
);

EmptyGroupResults.defaultProps = {};

const styles = ({ spacing }) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: [[spacing.unit * 5, 0]],
  },
});

export default withStyles(styles)(EmptyGroupResults);
