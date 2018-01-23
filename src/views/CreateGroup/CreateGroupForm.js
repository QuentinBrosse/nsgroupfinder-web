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
import { StationAutocomplete } from 'common/containers';
import { InputIconAdornment } from 'common/components';
import { TextField } from 'redux-form-material-ui';
import { required, date, numericality } from 'redux-form-validators';
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
        <Typography type="body1">
          Some informations...
          <br />
          Dolor dolor tempor ad aliquip do laborum mollit. Cupidatat est esse
          eiusmod elit qui cupidatat in. Labore consectetur ex tempor tempor
          fugiat minim cupidatat esse sunt do labore qui.
          <br />
          Velit excepteur est occaecat nisi in do ut in voluptate dolor. Ipsum
          sint eiusmod officia anim Lorem. Laboris nostrud consequat proident
          anim ex ut ullamco.
        </Typography>
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
                startAdornment: <InputIconAdornment iconName="date_range" />,
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
              id="infos"
              name="infos"
              label="Infos"
              type="text"
              placeholder="I like talking about my mother.."
              fullWidth
              InputLabelProps={{ shrink: true }}
              helperText="Information you want to communicate to users. They will be visible to all users (even those who will not be members of the group)."
              multiline
              component={TextField}
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button dense type="submit" disabled={pristine || submitting}>
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
  },
  validate: validatorFactory({
    departure: [required()],
    arrival: [required()],
    date: [required(), date({ format: 'yyyy-mm-dd' })],
    time: [required(), numericality({ '>=': 0, '<=': 23 })],
  }),
};

export default compose(withStyles(styles), reduxForm(formConfig))(
  CreateGroupForm
);
