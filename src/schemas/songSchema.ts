import { z } from 'zod';

export const songSchema = z.object({
  name: z
    .string({ required_error: 'Song name is required' })
    .min(1, 'Song name is required'),
  artist: z.string().optional(),
  album: z.string().optional(),
  songUrl: z
    .string({ required_error: 'Song url is required.' })
    .url('Song url is invalid.'),
  imageUrl: z.string().url('Song image is invalid.').optional(),
});

export type SongSchema = z.infer<typeof songSchema>;
