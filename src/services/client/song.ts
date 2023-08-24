import { Song } from '@prisma/client';
import { SongSchema } from '@/schemas/songSchema';
import { BaseResponse, BaseResponseNoData } from '@/types/api';

import client from './axios';

type SongResponse = BaseResponse<Song>;

type SongsResponse = BaseResponse<Song[]>;

export const createSong = (playlistId: bigint, data: SongSchema) =>
  client
    .post<SongResponse>(`/playlist/${playlistId}/song`, data)
    .then((res) => res.data.data);

export const editSong = (id: bigint, data: SongSchema) =>
  client.patch<SongResponse>(`/song/${id}`, data).then((res) => res.data.data);

export const deleteSong = (id: bigint) =>
  client.delete<BaseResponseNoData>(`/song/${id}`).then((res) => res.data);

export const updateSongLastPlayed = (songId: bigint) =>
  client.patch<BaseResponseNoData>(`/song/${songId}/last-played`);

export const getLastPlayedSongs = () =>
  client.get<SongsResponse>('/song/last-played').then((res) => res.data.data);

export const searchSongs = (query: string) =>
  client
    .get<SongsResponse>(`/song/search?query=${query}`)
    .then((res) => res.data.data);
