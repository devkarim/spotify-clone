import { Playlist } from '@prisma/client';
import { BaseResponse } from '@/types/api';
import { PlaylistSchema } from '@/schemas/playlistSchema';

import client from './axios';

type PlaylistResponse = BaseResponse<Playlist>;

export const createPlaylist = (data: PlaylistSchema) =>
  client.post<PlaylistResponse>('/playlist', data).then((res) => res.data.data);
