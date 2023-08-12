import Response from '@/types/server';

import Messages from './messages';

const Errors = {
  invalidCredentials: Response.error(Messages.errors.invalidCredentials, 400),
  emailTaken: Response.error(Messages.errors.emailTaken, 400),
} as const;

export default Errors;
