import { Prisma } from '@prisma/client';

export type FullPlaylist = Prisma.PlaylistGetPayload<{
  include: {
    songs: true;
  };
}>;

export type PlaylsitWithSongCount = Prisma.PlaylistGetPayload<{
  include: {
    _count: {
      select: {
        songs: true;
      };
    };
  };
}>;
