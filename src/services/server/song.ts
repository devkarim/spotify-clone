import prisma from '@/lib/prisma';
import { SongSchema } from '@/schemas/songSchema';

export const createSong = (playlistId: bigint, songData: SongSchema) =>
  prisma.song.create({ data: { playlistId, ...songData } });
