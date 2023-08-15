import prisma from '@/lib/prisma';

export const createPlaylist = (
  userId: bigint,
  name: string,
  imageUrl: string
) =>
  prisma.playlist.create({
    data: {
      userId,
      name,
      imageUrl,
    },
  });

export const getUserPlaylists = (userId?: bigint) =>
  userId
    ? prisma.playlist.findMany({
        where: {
          userId,
        },
        orderBy: { updatedAt: 'desc' },
      })
    : [];

export const getUserPlaylist = (userId: bigint, id: bigint) =>
  prisma.playlist.findUnique({
    where: {
      userId,
      id,
    },
  });

export const getPlaylistById = (id: bigint) =>
  prisma.playlist.findUnique({
    where: {
      id,
    },
  });
