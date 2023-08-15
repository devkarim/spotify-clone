import ServerError from '@/types/error';
import Messages from './messages';

const Errors = {
  invalidCredentials: ServerError.new(Messages.errors.invalidCredentials, 400),
  emailTaken: ServerError.new(Messages.errors.emailTaken, 400),
  unauthenticated: ServerError.new(Messages.errors.unauthenticated, 400),
  invalidId: ServerError.new(Messages.errors.invalidId, 400),
  notFound: ServerError.new(Messages.errors.notFound, 404),
} as const;

export default Errors;
