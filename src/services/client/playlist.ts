import { Playlist } from '@prisma/client';
import { FullPlaylist } from '@/types/db';
import { BaseResponse } from '@/types/api';
import { PlaylistSchema } from '@/schemas/playlistSchema';

import client from './axios';

type PlaylistResponse = BaseResponse<Playlist>;

type FullPlaylistResponse = BaseResponse<FullPlaylist>;

export const createPlaylist = (data: PlaylistSchema) =>
  client.post<PlaylistResponse>('/playlist', data).then((res) => res.data.data);

export const getUserPlaylist = async (playlistId: bigint) => {
  return client
    .get<FullPlaylistResponse>(`/playlist/${playlistId}`)
    .then((res) => res.data.data);
};
