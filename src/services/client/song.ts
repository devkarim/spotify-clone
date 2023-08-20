import { Song } from '@prisma/client';
import { BaseResponse, BaseResponseNoData } from '@/types/api';
import { SongSchema } from '@/schemas/songSchema';

import client from './axios';

type SongResponse = BaseResponse<Song>;

export const createSong = (data: SongSchema, playlistId: bigint) =>
  client
    .post<SongResponse>(`/playlist/${playlistId}/song`, data)
    .then((res) => res.data.data);

export const updateSongLastPlayed = (songId: bigint) =>
  client.patch<BaseResponseNoData>(`/song/${songId}/last-played`);

export const getLastPlayedSongs = () =>
  client
    .get<BaseResponse<Song[]>>('/song/last-played')
    .then((res) => res.data.data);
