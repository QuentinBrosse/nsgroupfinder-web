// @flow

import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import indigo from 'material-ui/colors/indigo';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { throwDissmissSnackbar, throwAccentSnackbar } from 'actions/snackbar';
import { isConnected } from 'utils/user';
import { logErrorIfDevEnv } from 'utils/env';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Icon from 'material-ui/Icon';
import green from 'material-ui/colors/green';
import amber from 'material-ui/colors/amber';
import pink from 'material-ui/colors/pink';
import blue from 'material-ui/colors/blue';
import VerticalStepper from './VerticalStepper';

type Props = {
  classes: Object,
  firebase: Object,
  auth: Object,
  location: Object,
  dThrowDissmissSnackbar: Function,
  dThrowAccentSnackbar: Function,
};

type State = {};

class LogIn extends React.Component<Props, State> {
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.logIn = this.logIn.bind(this);
  }

  logIn: Function;

  async logIn() {
    const {
      firebase,
      dThrowDissmissSnackbar,
      dThrowAccentSnackbar,
    } = this.props;
    try {
      const { additionalUserInfo } = await firebase.login({
        provider: 'facebook',
        type: 'popup',
      });
      const {
        first_name: firstName,
        last_name: lastName,
        age_range: ageRange,
        gender,
        id: facebookAppId,
        link: facebookLink,
      } = additionalUserInfo.profile;
      firebase.updateProfile({
        firstName,
        lastName,
        ageRange,
        gender,
        facebookAppId,
        facebookLink,
      });
      dThrowDissmissSnackbar(`Welcome ${firstName} !`);
    } catch (err) {
      logErrorIfDevEnv(err);
      dThrowAccentSnackbar('Ooops, try again later please :/');
    }
  }

  render() {
    const { classes, auth, location } = this.props;
    if (isConnected(auth)) {
      const { state } = location;
      return <Redirect to={state.returnTo || '/app'} />;
    }
    return (
      <div className={classes.container}>
        <div className={classes.coverImage} />
        <div className={classes.headContent}>
          <Paper className={classes.paper}>
            <Grid
              container
              alignItems="center"
              direction="row"
              justify="flex-start"
            >
              <Grid item>
                <img
                  alt="NSLogo"
                  className={classes.img}
                  src="https://scontent-amt2-1.xx.fbcdn.net/v/t1.0-9/27460024_927444810746348_7015358258320655107_n.png?oh=f23a05cc5c85845fa5094f9116dfa175&oe=5B0DE849"
                />
              </Grid>
              <Grid item>
                <Grid
                  container
                  alignItems="flex-start"
                  direction="column"
                  justify="flex-start"
                >
                  <Grid item>
                    <Typography
                      className={classes.appTitle}
                      variant="display3"
                      align="left"
                    >
                      NsGroupFinder
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button
                      size="small"
                      variant="raised"
                      className={classes.appButtonDesktop}
                      color="secondary"
                      onClick={this.logIn}
                    >
                      <Typography color="primary" variant="button">
                        Discover the WebApp
                      </Typography>
                      <Icon className={classes.rightIcon}>send</Icon>
                    </Button>
                    <Button
                      mini
                      variant="raised"
                      className={classes.appButtonMobile}
                      color="secondary"
                      onClick={this.logIn}
                    >
                      <Typography color="primary" variant="button">
                        Open the WebApp
                      </Typography>
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <div className={classes.titleContent}>
              <Typography variant="headline">What&apos;s the plan ?</Typography>
              <Typography variant="body1">
                As you already may know, Ns rules have changed since 15 th
                January 2018. Many people argues they are binding rules since
                they make travelling a complex matter.<br />
                WE HAVE A SOLUTION ! In fact, we developed a fancy new platform
                from which you can make/find a group ticket in a very easy way.
                It is pretty straightforward, accessible and easy to use. To
                give a brief explanation, the website we set up is aimed at
                gathering people who want to travel in the Netherlands together.
                By selecting the departure station, arrival station and starting
                time trip, we suggest travelers some groups they can join. The
                first option is that these groups have already been created by
                other fellow travelers, so you can join and be part of the group
                until it’s full (7 people max.) The second option is that there
                is no existing group that suits your route and your schedule. In
                that case, you have the possibility to create a new group that
                fits your criteria. Once you created a group, travelers
                interested in may ask to join it.
              </Typography>
            </div>
          </Paper>
        </div>
        <div className={classes.bodyContent}>
          <Paper className={classes.paperSteper}>
            <Typography variant="headline">But how does it work ?</Typography>
            <VerticalStepper />
          </Paper>
        </div>
        <div className={classes.bodyContent}>
          <Paper className={classes.paper}>
            <Typography variant="headline" className={classes.paperTitle}>
              Why should I use this WebApp ?
            </Typography>
            <Typography variant="body1">
              It&apos;s simpler, cleaner and easier to manage your group.
              Don&apos;t waste time searching on facebook where things can get a
              bit messy.
            </Typography>
            <Typography variant="body1">
              Keep your group clean and plan your journey in a better way by
              using the group admin tools. You can also inform they other
              members about who already paid. As a Admin you can share your
              group on other socials medias by using a unique link, where people
              can directly enter the number of tickets they need. And much more
              is coming !
            </Typography>
          </Paper>
        </div>
        <div className={classes.bodyContent}>
          <Grid container direction="row" alignItems="center" justify="center">
            <Grid item sm={3}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.media}
                  image="http://marketing-digital.audencia.com/wp-content/uploads/2016/10/minititle-5342-q90-h900-ml99-rz3-b75.jpg"
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography variant="headline" component="h2">
                    Screenshots of the app
                  </Typography>
                  <Typography component="p">
                    missing explanation of the picture
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item sm={3}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.media}
                  image="https://prodesign.in.ua/wp-content/uploads/material-design-title-960x420.jpg"
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography variant="headline" component="h2">
                    Screenshots of the app
                  </Typography>
                  <Typography component="p">
                    missing explanation of the picture
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item sm={3}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.media}
                  image="http://marketing-digital.audencia.com/wp-content/uploads/2016/10/minititle-5342-q90-h900-ml99-rz3-b75.jpg"
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography variant="headline" component="h2">
                    Screenshots of the app
                  </Typography>
                  <Typography component="p">
                    missing explanation of the picture
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item sm={3}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.media}
                  image="https://prodesign.in.ua/wp-content/uploads/material-design-title-960x420.jpg"
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography variant="headline" component="h2">
                    Screenshots of the app
                  </Typography>
                  <Typography component="p">
                    missing explanation of the picture
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
        <div className={classes.bodyContent}>
          <Paper className={classes.paperSteper}>
            <Typography variant="headline" className={classes.paperTitle}>
              Is there any rules ?
            </Typography>
            <Typography variant="body1">
              The only rules that you need to know are the one from NS.
            </Typography>
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
              You can&apos;t use the ticket for return in the same day. Group
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
              <span className={classes.station}> 18:30</span> on Friday evening
              until
              <span className={classes.station}> 06:30</span> on Monday morning.
              <br />
              <span className={classes.underline}>
                {' '}
                You&apos;re not allowed to be IN the train during the peak hours{' '}
              </span>
            </Typography>
            <br />
            <Typography variant="body2">Use bigger station</Typography>
            <Typography>
              You can always jump in the train at a later station than the
              group. So if you don&apos;t find any group. Try to find the best
              route on the ns.nl website. That means, a route that is passing by
              a big station.
            </Typography>
          </Paper>
        </div>
      </div>
    );
  }
}

const styles = ({ spacing, breakpoints }) => ({
  [breakpoints.up('xs')]: {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      justifyContent: 'flex-start',
    },
    headContent: {
      zIndex: '1',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: [
        [
          spacing.unit * 40,
          spacing.unit * 20,
          spacing.unit * 2,
          spacing.unit * 20,
        ],
      ],
    },
    bodyContent: {
      zIndex: '1',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: [[spacing.unit * 2, spacing.unit * 20]],
    },
    rightIcon: {
      color: indigo[500],
      marginLeft: spacing.unit,
    },
    titleContent: {
      marginTop: spacing.unit * 6,
    },
    paddingDiv: {
      padding: [[spacing.unit * 3, spacing.unit * 3]],
    },
    paper: {
      padding: [[spacing.unit * 3, spacing.unit * 3]],
    },
    paperSteper: {
      padding: [[spacing.unit * 3, spacing.unit * 3]],
      width: '100%',
    },
    paperTitle: {
      paddingBottom: '24px',
    },
    coverImage: {
      backgroundImage:
        'url(https://orig00.deviantart.net/1d2e/f/2016/236/b/8/numa_smart_city_wallpaper_ultra_flat_ver_02_by_charlie_henson-d8exjxa.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '40%',
      width: '100%',
      top: 0,
      position: 'fixed',
      boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    },
    beta: {
      height: 'auto',
      padding: 10,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: indigo[700],
    },
    img: {
      width: '200px',
      height: '200px',
    },
    appButtonMobile: {
      display: 'none',
    },
  },
  [breakpoints.up('lg')]: {
    headContent: {
      zIndex: '1',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: [
        [
          spacing.unit * 35,
          spacing.unit * 50,
          spacing.unit * 2,
          spacing.unit * 50,
        ],
      ],
    },
    bodyContent: {
      zIndex: '1',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: [[spacing.unit * 2, spacing.unit * 50]],
    },
  },
  [breakpoints.down('xs')]: {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      justifyContent: 'flex-start',
    },
    headContent: {
      zIndex: '1',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: [
        [spacing.unit * 20, spacing.unit * 2, spacing.unit, spacing.unit * 2],
      ],
    },
    bodyContent: {
      zIndex: '1',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: [[spacing.unit, spacing.unit * 2]],
    },
    img: {
      width: '65px',
      height: '65px',
    },
    appTitle: {
      fontSize: '1.5rem',
    },
    appButtonDesktop: {
      display: 'none',
    },
    appButtonMobile: {
      display: 'inline',
    },
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
});

const mapStateToProps = ({ firebase: { auth } }) => ({
  auth,
});

const mapDispatchToProps = {
  dThrowDissmissSnackbar: throwDissmissSnackbar,
  dThrowAccentSnackbar: throwAccentSnackbar,
};

export default compose(
  withFirebase,
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(LogIn);
