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
