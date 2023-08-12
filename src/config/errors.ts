import ServerError from '@/types/error';
import Messages from './messages';

const Errors = {
  invalidCredentials: ServerError.new(Messages.errors.invalidCredentials, 400),
  emailTaken: ServerError.new(Messages.errors.emailTaken, 400),
  unauthenticated: ServerError.new(Messages.errors.unauthenticated, 400),
} as const;

export default Errors;
