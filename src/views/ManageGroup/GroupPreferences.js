// @flow

import React from 'react';
import type { Node } from 'react';
import { compose } from 'redux';
import { withStyles } from 'material-ui/styles';
import { Field, reduxForm } from 'redux-form';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import { TextField } from 'redux-form-material-ui';
import { length } from 'redux-form-validators';
import { validatorFactory } from 'utils/form';

type Props = {
  classes: Object,
  handleSubmit: Function,
  pristine: boolean,
  submitting: boolean,
};
const GroupPreferences = ({
  classes,
  handleSubmit,
  pristine,
  submitting,
}: Props): Node => (
  <form onSubmit={handleSubmit} className={classes.form}>
    <Grid container>
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
    <Button
      raised
      type="submit"
      disabled={pristine || submitting}
      className={classes.button}
    >
      Send
    </Button>
  </form>
);

GroupPreferences.defaultProps = {};

const styles = ({ spacing }) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: spacing.unit * 3,
  },
  button: {
    marginTop: spacing.unit * 3,
    alignSelf: 'flex-end',
  },
});

const formConfig = {
  form: 'modifyGroupPreferences',
  validate: validatorFactory({
    public_info: [length({ max: 500 })],
    private_info: [length({ max: 500 })],
  }),
};

export default compose(withStyles(styles), reduxForm(formConfig))(
  GroupPreferences
);
