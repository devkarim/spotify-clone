import ServerError from '@/types/error';
import Messages from './messages';

const Errors = {
  invalidCredentials: ServerError.new(Messages.errors.invalidCredentials, 400),
  emailTaken: ServerError.new(Messages.errors.emailTaken, 400),
  unauthenticated: ServerError.new(Messages.errors.unauthenticated, 401),
  unauthorized: ServerError.new(Messages.errors.unauthorized, 403),
  invalidPlaylistId: ServerError.new(Messages.errors.invalidPlaylistId, 400),
  invalidSongId: ServerError.new(Messages.errors.invalidSongId, 400),
  invalidId: ServerError.new(Messages.errors.invalidId, 400),
  notFound: ServerError.new(Messages.errors.notFound, 404),
  invalidFile: ServerError.new(Messages.errors.invalidFile, 404),
} as const;

export default Errors;
