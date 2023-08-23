import { z } from 'zod';

export const playlistSchema = z.object({
  name: z
    .string({ required_error: 'Playlist name is required' })
    .min(1, 'Playlist name is required'),
  imageUrl: z
    .string()
    .url('Playlist image is invalid')
    .optional()
    .or(z.undefined()),
});

export type PlaylistSchema = z.infer<typeof playlistSchema>;
