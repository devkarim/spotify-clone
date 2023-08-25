import ServerError from '@/types/error';
import Messages from './messages';

const Errors = {
  emailTaken: ServerError.new(Messages.errors.emailTaken, 400),
  invalidId: ServerError.new(Messages.errors.invalidId, 400),
  queryRequired: ServerError.new(Messages.errors.queryRequired, 400),
  invalidSongId: ServerError.new(Messages.errors.invalidSongId, 400),
  invalidPlaylistId: ServerError.new(Messages.errors.invalidPlaylistId, 400),
  invalidCredentials: ServerError.new(Messages.errors.invalidCredentials, 400),
  invalidFile: ServerError.new(Messages.errors.invalidFile, 400),
  unauthenticated: ServerError.new(Messages.errors.unauthenticated, 401),
  unauthorized: ServerError.new(Messages.errors.unauthorized, 403),
  maxSongs: ServerError.new(Messages.errors.maxSongs, 403),
  maxPlaylists: ServerError.new(Messages.errors.maxPlaylists, 403),
  notFound: ServerError.new(Messages.errors.notFound, 404),
  alreadyPremium: ServerError.new(Messages.errors.alreadyPremium, 409),
} as const;

export default Errors;
