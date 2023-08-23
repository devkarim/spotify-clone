import prisma from '@/lib/prisma';
import { PlaylistSchema } from '@/schemas/playlistSchema';

export const createPlaylist = (
  userId: bigint,
  name: string,
  imageUrl?: string
) =>
  prisma.playlist.create({
    data: {
      userId,
      name,
      imageUrl,
    },
  });

export const updatePlaylist = (id: bigint, data: PlaylistSchema) =>
  prisma.playlist.update({
    where: {
      id,
    },
    data,
  });

export const getUserPlaylists = (userId?: bigint) =>
  userId
    ? prisma.playlist.findMany({
        where: {
          userId,
        },
        orderBy: { updatedAt: 'desc' },
        include: { _count: { select: { songs: true } } },
      })
    : [];

export const getUserPlaylist = (userId: bigint, id: bigint) =>
  prisma.playlist.findUnique({
    where: {
      userId,
      id,
    },
    include: {
      songs: true,
    },
  });

export const getPlaylistById = (id: bigint) =>
  prisma.playlist.findUnique({
    where: {
      id,
    },
    include: {
      songs: true,
    },
  });

export const updatePlaylistLastPlayed = (userId: bigint, id: bigint) =>
  prisma.playlist.update({
    where: { id, userId },
    data: { lastPlayedAt: new Date() },
  });

export const getLastPlayedPlaylists = (userId?: bigint) =>
  userId
    ? prisma.playlist.findMany({
        where: {
          userId,
          lastPlayedAt: {
            not: null,
          },
        },
        orderBy: {
          lastPlayedAt: 'desc',
        },
        include: { _count: { select: { songs: true } } },
        take: 5,
      })
    : [];
