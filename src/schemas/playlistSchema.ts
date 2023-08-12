import { z } from 'zod';

export const playlistSchema = z.object({
  name: z
    .string({ required_error: 'Playlist name is required' })
    .min(1, 'Playlist name is required'),
  imageUrl: z
    .string({ required_error: 'Playlist image is required.' })
    .url('Playlist image is invalid'),
});

export type PlaylistSchema = z.infer<typeof playlistSchema>;
