import { Schema } from 'express-validator';
import passwordRegex from '../../utils/passwordRegex';

const updatePasswordSchema: Schema = {
  password: {
    exists: {
      options: { checkFalsy: true },
      errorMessage: 'common.validations.required',
      bail: true,
    },
  },
  newPassword: {
    exists: {
      options: { checkFalsy: true },
      errorMessage: 'common.validations.required',
      bail: true,
    },
    matches: {
      options: passwordRegex,
      errorMessage: 'common.validations.password',
    },
  },
  confirmationPassword: {
    exists: {
      options: { checkFalsy: true },
      errorMessage: 'common.validations.required',
      bail: true,
    },
    custom: {
      options: (confirmationPassword: string, { req }) => {
        if (confirmationPassword !== req.body.newPassword) {
          throw new Error('common.validations.passwordsMatch');
        }
        return true;
      },
    },
  },
};

export default updatePasswordSchema;
