// @flow

import React from 'react';
import type { Node } from 'react';
import { withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import { ButtonIcon } from 'common/components';

type Props = {
  classes: Object,
};

const GroupCardContainerFooter = ({ classes }: Props): Node => (
  <div className={classes.container}>
    <Divider className={classes.divider} />
    <Typography
      type="subheading"
      align="center"
      headlineMapping={{ subheading: 'p' }}
      color="secondary"
    >
      You are not satisfied with the results?{' '}
      <span role="img" aria-label="Sad emojy">
        😔
      </span>
      <br />
      Create your own !{' '}
      <span role="img" aria-label="Sad emojy">
        💪
      </span>
    </Typography>
    <ButtonIcon iconName="add" component={Link} to="/create-group">
      Create a Group
    </ButtonIcon>
  </div>
);

GroupCardContainerFooter.defaultProps = {};

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: [[theme.spacing.unit * 5, 0]],
  },
  divider: {
    width: '40%',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 3,
  },
});

export default withStyles(styles)(GroupCardContainerFooter);
