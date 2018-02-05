// @flow

import React from 'react';
import type { Node } from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Tooltip from 'material-ui/Tooltip';
import type { Member } from 'types/user';

type Props = {
  classes: Object,
  member: Member,
};

const FacebookLink = ({ classes, member }: Props): Node => (
  <Tooltip id="tooltip-right" title="Open Facebook" placement="right">
    <Button
      className={classes.buttonFacebook}
      size="small"
      color="primary"
      component="a"
      href={member.user.facebookLink}
      target="_blank"
    >
      {member.user.displayName}
    </Button>
  </Tooltip>
);

FacebookLink.defaultProps = {};

const styles = {};

export default withStyles(styles)(FacebookLink);
