import { Playlist } from '@prisma/client';

import { FullPlaylist } from '@/types/db';
import { PlaylistSchema } from '@/schemas/playlistSchema';
import { BaseResponse, BaseResponseNoData } from '@/types/api';

import client from './axios';

type PlaylistResponse = BaseResponse<Playlist>;

type FullPlaylistResponse = BaseResponse<FullPlaylist>;

export const createPlaylist = (data: PlaylistSchema) =>
  client.post<PlaylistResponse>('/playlist', data).then((res) => res.data.data);

export const updatePlaylist = (playlistId: bigint, data: PlaylistSchema) =>
  client
    .patch<PlaylistResponse>(`/playlist/${playlistId}`, data)
    .then((res) => res.data.data);

export const getUserPlaylist = async (playlistId: bigint) => {
  return client
    .get<FullPlaylistResponse>(`/playlist/${playlistId}`)
    .then((res) => res.data.data);
};

export const updatePlaylistLastPlayed = (playlistId: bigint) =>
  client.patch<BaseResponseNoData>(`/playlist/${playlistId}/last-played`);

export const getLastPlayedPlaylists = () =>
  client
    .get<BaseResponse<Playlist[]>>('/playlist/last-played')
    .then((res) => res.data.data);
