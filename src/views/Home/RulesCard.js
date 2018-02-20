// @flow

import React from 'react';
import type { Node } from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Card, { CardActions, CardContent, CardHeader } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';
import Icon from 'material-ui/Icon';
import amber from 'material-ui/colors/amber';

type Props = {
  classes: Object,
};

const RulesCard = ({ classes }: Props): Node => (
  <div>
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="Recipe" className={classes.avatar}>
            <Icon color="primary">assignment</Icon>
          </Avatar>
        }
        title="How to use the WebApp"
        className={classes.title}
      />
      <CardContent>
        <Typography>
          You MUST to travel with your lead booker and during off-peak hours.
          You're not allowed to BE in the train at those peak hours.
        </Typography>
        <Typography>
          If you don't find any groups with your departure station, try to use
          bigger departure station. As you don't need to start the train journey
          with your group leader, you can always jump in/out the train at a
          later station.{' '}
        </Typography>
        <br />
        <Typography>Click lean more if you want more explanation !</Typography>
      </CardContent>
      <CardActions>
        <Button color="primary" size="small">
          Learn More
        </Button>
      </CardActions>
    </Card>
  </div>
);

RulesCard.defaultProps = {};

const styles = {
  avatar: {
    backgroundColor: amber[500],
  },
};

export default withStyles(styles)(RulesCard);
