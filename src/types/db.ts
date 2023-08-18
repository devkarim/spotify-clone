import { Prisma } from '@prisma/client';

export type FullPlaylist = Prisma.PlaylistGetPayload<{
  include: {
    songs: true;
  };
}>;
