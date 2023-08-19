import { Playlist, Song } from '@prisma/client';

export interface Item {
  title: string;
  subtitle: string;
  imageUrl: string | null;
  song?: Song;
  playlist?: Playlist;
}

export type ModalStatus = 'create' | 'edit';
