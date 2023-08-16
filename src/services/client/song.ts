import { Song } from '@prisma/client';
import { BaseResponse } from '@/types/api';
import { SongSchema } from '@/schemas/songSchema';

import client from './axios';

type SongResponse = BaseResponse<Song>;

export const createSong = (data: SongSchema, playlistId: bigint) =>
  client
    .post<SongResponse>(`/playlist/${playlistId}/song`, data)
    .then((res) => res.data.data);
