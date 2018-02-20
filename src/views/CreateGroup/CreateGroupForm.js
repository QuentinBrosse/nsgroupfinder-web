// @flow

import React from 'react';
import type { Node } from 'react';
import { compose } from 'redux';
import { withStyles } from 'material-ui/styles';
import { Field, reduxForm } from 'redux-form';
import moment from 'moment';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import Icon from 'material-ui/Icon';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider/Divider';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import LabelIcon from 'material-ui-icons/Label';
import { StationAutocomplete } from 'common/containers';
import { InputIconAdornment } from 'common/components';
import { TextField } from 'redux-form-material-ui';
import { required, date, numericality, length } from 'redux-form-validators';
import { validatorFactory } from 'utils/form';

type Props = {
  classes: Object,
  handleSubmit: Function,
  pristine: boolean,
  submitting: boolean,
  change: Function,
};

const CreateGroupForm = ({
  classes,
  handleSubmit,
  pristine,
  submitting,
  change,
}: Props): Node => (
  <form onSubmit={handleSubmit}>
    <Card>
      <CardHeader title="Create a Group" />
      <CardContent>
        <Grid item xs={12} md={12}>
          <Typography color="primary" variant="title" className={classes.title}>
            Informations !
          </Typography>
          <div className={classes.demo}>
            <List dense="true">
              <ListItem>
                <ListItemIcon>
                  <LabelIcon />
                </ListItemIcon>
                <ListItemText primary="you MUST travel with the guy who created the group and bought the tickets" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <LabelIcon />
                </ListItemIcon>
                <ListItemText primary="The Group Ticket only lets you travel at off-peak hours.
                  On Monday to Friday : before 06:30, between 09:00 and 16:00 and after 18:30.
                  At weekends, it is all day from 18:30 on Friday evening until 06:30 on Monday morning. You're not allowed to BE in the train at those peak hours" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <LabelIcon />
                </ListItemIcon>
                <ListItemText primary="You have to sit
as near as possible to each others! Sum up: be able to prove that you travel with your
book leader." />
              </ListItem>
            </List>
          </div>
        </Grid>
        <Divider className={classes.divdier} />
        <Grid container>
          <Grid item xs={12}>
            <div className={classes.stationsContainer}>
              <Field
                id="departure"
                name="departure"
                component={StationAutocomplete}
                placeholder="Departure Station"
                iconName="train"
                change={change}
              />
              <Icon className={classes.stationArrowContainer}>
                arrow_forward
              </Icon>
              <Field
                id="arrival"
                name="arrival"
                component={StationAutocomplete}
                placeholder="Arrival Station"
                iconName="train"
                change={change}
              />
            </div>
          </Grid>
        </Grid>
        <Grid
          container
          justify="space-between"
          className={classes.dateTimeContainer}
        >
          <Grid item xs={12} sm={6}>
            <Field
              id="date"
              name="date"
              component={TextField}
              label="Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: <InputIconAdornment iconName="date_range" />,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field
              id="time"
              name="time"
              component={TextField}
              label="Time"
              type="number"
              fullWidth
              InputLabelProps={{ shrink: true }}
              helperText="A one-hour hourly range"
              InputProps={{
                startAdornment: <InputIconAdornment iconName="schedule" />,
                inputProps: {
                  min: '0',
                  max: '23',
                },
              }}
            />
          </Grid>
        </Grid>
        <Grid
          container
          justify="space-between"
          className={classes.dateTimeContainer}
        >
          <Grid item xs={12}>
            <Field
              id="ticketUnits"
              name="ticketUnits"
              component={TextField}
              label="Number of Tickets"
              type="number"
              fullWidth
              helperText="How many tickets do you want for yourself?"
              InputProps={{
                inputProps: {
                  min: '1',
                  max: '6',
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              id="public_info"
              name="public_info"
              label="Public Info"
              type="text"
              fullWidth
              helperText="Information you want to communicate to users. They will be visible to all users (even those who will not be members of the group)."
              component={TextField}
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              id="private_info"
              name="private_info"
              label="Private Info"
              type="text"
              fullWidth
              helperText="Information you want to communicate to your members. They will be visible only to confirmed members of your group."
              component={TextField}
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          variant="raised"
          type="submit"
          disabled={pristine || submitting}
        >
          Create
        </Button>
      </CardActions>
    </Card>
  </form>
);

CreateGroupForm.defaultProps = {};

const styles = ({ spacing, breakpoints }) => ({
  stationsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stationTextFieldContainer: {
    background: 'grey',
  },
  stationArrowContainer: {
    display: 'none',
    padding: [[0, 20]],
    textAlign: 'center',
  },
  [breakpoints.up('sm')]: {
    stationsContainer: {
      flexDirection: 'row',
    },
    stationTextFieldContainer: {
      flex: [1, 1, 'auto'],
    },
    stationArrowContainer: {
      display: 'block',
      flex: [0, 0, 'auto'],
    },
  },
  divdier: {
    marginTop: spacing.unit * 4,
    marginBottom: spacing.unit * 4,
  },
  dateTimeContainer: {
    marginTop: spacing.unit * 2,
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
});

const formConfig = {
  form: 'createGroup',
  initialValues: {
    date: moment()
      .add(2, 'day')
      .format('YYYY-MM-DD'),
    time: String(moment().hour()),
    ticketUnits: 1,
  },
  validate: validatorFactory({
    departure: [required()],
    arrival: [required()],
    date: [required(), date({ format: 'yyyy-mm-dd' })],
    time: [required(), numericality({ '>=': 0, '<=': 23 })],
    public_info: [length({ max: 500 })],
    private_info: [length({ max: 500 })],
    ticketUnits: [required(), numericality({ '>=': 1, '<=': 6 })],
  }),
};

export default compose(withStyles(styles), reduxForm(formConfig))(
  CreateGroupForm
);
