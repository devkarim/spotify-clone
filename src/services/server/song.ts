import prisma from '@/lib/prisma';
import { SongSchema } from '@/schemas/songSchema';

export const createSong = (playlistId: bigint, songData: SongSchema) =>
  prisma.song.create({ data: { playlistId, ...songData } });

export const getSongById = (id: bigint) =>
  prisma.song.findUnique({ where: { id }, include: { playlist: true } });

export const updateSongLastPlayed = (id: bigint) =>
  prisma.song.update({
    where: { id },
    data: { lastPlayedAt: new Date() },
  });

export const getLastPlayedSongs = (userId?: bigint) =>
  userId
    ? prisma.song.findMany({
        where: { playlist: { userId } },
        include: { playlist: true },
        orderBy: { lastPlayedAt: 'desc' },
        take: 10,
      })
    : [];
