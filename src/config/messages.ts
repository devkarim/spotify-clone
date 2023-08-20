const Messages = {
  errors: {
    invalidCredentials: 'Invalid email or password.',
    emailTaken: 'Email is already taken.',
    unauthenticated: 'Unauthenticated.',
    unauthorized: "You don't have permission to do that.",
    invalidPlaylistId: 'Invalid playlist id.',
    invalidSongId: 'Invalid song id.',
    invalidId: 'Invalid id.',
    notFound: 'Not found.',
    invalidFile: 'Invalid file.',
  },
} as const;

export default Messages;
