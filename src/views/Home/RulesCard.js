// @flow

import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Card, { CardActions, CardContent, CardHeader } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';
import Icon from 'material-ui/Icon';
import amber from 'material-ui/colors/amber';
import blue from 'material-ui/colors/blue';
import pink from 'material-ui/colors/pink';
import green from 'material-ui/colors/green';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

type Props = {
  classes: Object,
  fullScreen: Boolean,
};

class ResponsiveDialog extends React.Component<Props> {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, fullScreen } = this.props;

    return (
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
              You MUST to travel with your lead booker and during off-peak
              hours. You're not allowed to BE in the train at those peak hours.
            </Typography>
            <Typography>
              If you don't find any groups with your departure station, try to
              use bigger departure station. As you don't need to start the train
              journey with your group leader, you can always jump in/out the
              train at a later station.{' '}
            </Typography>
            <br />
            <Typography>
              Click lean more if you want more explanation !
            </Typography>
          </CardContent>
          <CardActions>
            <Button color="primary" size="small" onClick={this.handleClickOpen}>
              Learn More
            </Button>
          </CardActions>
        </Card>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {'The NS rules'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Typography variant="body2">The cost :</Typography>
              <Typography>- 4 people = 7€50/p</Typography>
              <Typography>- 5 people = 6€30/p</Typography>
              <Typography>- 6 people = 5€50/p</Typography>
              <Typography>- 7 people = 4€93/p</Typography>
              <br />
              <Typography variant="body2">
                You must travel with your leadbooker
              </Typography>
              <Typography>
                That, of course, make the thing a bit more complicated since you
                MUST travel with the guy who created the group and bought the
                tickets (Ticket holder).
              </Typography>
              <br />
              <Typography>
                <span className={classes.underline}> Here is an exemple:</span>
                <br />
                Four people are travelling from{' '}
                <span className={classes.station}>Groningen</span> to{' '}
                <span className={classes.station}>Amsterdam</span>,
                <span className={classes.adam}> Adam</span>,
                <span className={classes.eve}> Eve</span>,
                <span className={classes.jack}> Jack </span>
                and
                <span className={classes.rose}> Rose</span>.
                <br />
                <span className={classes.adam}> Adam</span> is the ticket holder
                (group leader), he MUST have the longest route, that is{' '}
                <span className={classes.station}>Groningen</span> -{' '}
                <span className={classes.station}>Amsterdam</span>.
                <br /> <span className={classes.jack}> Jack </span> has the same
                route, he must meet
                <span className={classes.adam}> Adam</span> in the train at{' '}
                <span className={classes.station}>Groningen</span>.
                <br />
                <span className={classes.eve}> Eve</span> and{' '}
                <span className={classes.rose}> Rose</span> are taking the same
                train but they get on it in{' '}
                <span className={classes.station}>Zwolle</span> and they stop in{' '}
                <span className={classes.station}>Almere centrum</span>. Once in
                the train, they have to find their lead booker and travel
                together.
              </Typography>
              <Typography>
                Therefore, it’s not a messy deal as long as you travel with your
                lead booker.
              </Typography>
              <br />
              <Typography variant="body2">One way ticket</Typography>
              <Typography>
                You can't use the ticket for return in the same day. Group
                tickets are one way only now.
              </Typography>
              <br />
              <Typography variant="body2">Sit close to each other</Typography>
              <Typography>
                However, it’s not always possible to sit near each other, so you
                have to sit as near as possible!
                <br />
                <span className={classes.underline}> Sum up:</span> be able to
                prove that you travel with your book leader.
              </Typography>
              <br />
              <Typography variant="body2">Your journey schedule</Typography>
              <Typography>
                The Group Ticket only lets you travel at off-peak hours.
                <br /> On Monday to Friday, you can travel before
                <span className={classes.station}> 06:30</span> , between
                <span className={classes.station}> 09:00</span> and
                <span className={classes.station}> 16:00</span> and after
                <span className={classes.station}> 18:30</span>.
                <br /> At weekends, you can travel
                <span className={classes.station}> all day</span> from
                <span className={classes.station}> 18:30</span> on Friday
                evening until
                <span className={classes.station}> 06:30</span> on Monday
                morning.
                <br />
                <span className={classes.underline}>
                  {' '}
                  You're not allowed to be IN the train during the peak hours{' '}
                </span>
              </Typography>
              <br />
              <Typography variant="body2">One way ticket</Typography>
              <Typography>
                You can't use the ticket for return in the same day. Group
                tickets are one way only now.
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const styles = {
  avatar: {
    backgroundColor: amber[500],
  },
  adam: {
    color: blue[500],
    fontStyle: 'italic',
  },
  eve: {
    color: amber[700],
    fontStyle: 'italic',
  },
  jack: {
    color: green[500],
    fontStyle: 'italic',
  },
  rose: {
    color: pink[400],
    fontStyle: 'italic',
  },
  station: {
    fontWeight: 'bold',
    color: '#00000096',
  },
  underline: {
    textDecoration: 'underline',
    color: '#000000ad',
  },
};

export default withStyles(styles)(ResponsiveDialog);
