// @flow

import _ from 'lodash';
import Validators from 'redux-form-validators';

/* eslint-disable import/prefer-default-export */

Object.assign(Validators.messages, {
  dateFormat: {
    id: 'form.errors.dateFormat',
    defaultMessage: 'is not well formatted.',
  },
});

export const validatorFactory = (validators: Object) => (values: Object) =>
  _.mapValues(validators, (validator: Array<Function>, field: string) => {
    const value = values[field];
    return validator
      .map(validateField => validateField(value, values))
      .find(x => x);
  });
