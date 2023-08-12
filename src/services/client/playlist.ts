import { Playlist } from '@prisma/client';
import { BaseResponse } from '@/types/api';

import client from './axios';

type PlaylistResponse = BaseResponse<Playlist>;

export const createPlaylist = (name: string, imageUrl: string) =>
  client
    .post<PlaylistResponse>('/playlist', { name, imageUrl })
    .then((res) => res.data.data);
