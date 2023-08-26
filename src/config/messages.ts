const Messages = {
  errors: {
    invalidCredentials: 'Invalid email or password.',
    emailTaken: 'Email is already taken.',
    invalidPlaylistId: 'Invalid playlist id.',
    invalidSongId: 'Invalid song id.',
    queryRequired: 'Search query is required.',
    invalidFile: 'Invalid file.',
    invalidId: 'Invalid id.',
    unauthenticated: 'You need to be authenticated to do that.',
    unauthorized: "You don't have permission to do that.",
    maxSongs: 'Max songs reached. Subscribe to premium plan.',
    maxPlaylists: 'Max playlists reached. Subscribe to premium plan.',
    notFound: 'Not found.',
    alreadyPremium: 'Already in premium plan.',
  },
} as const;

export default Messages;
