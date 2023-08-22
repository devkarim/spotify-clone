'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import ConfirmModal from '@/components/modals/confirm-modal';

import { Song } from '@prisma/client';

import SongRow from './song-row';
import { deleteSong } from '@/services/client/song';
import log from '@/lib/log';
import Response from '@/types/server';
import { useRouter } from 'next/navigation';

interface SongsListProps {
  songs: Song[];
}

const SongsList: React.FC<SongsListProps> = ({ songs }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [songId, setSongId] = useState<bigint>();

  const onConfirm = async () => {
    if (!songId) return toast.error('Unable to find song ID to delete.');
    setLoading(true);
    try {
      await deleteSong(songId);
      toast.success('Song deleted.');
      setIsOpen(false);
      router.refresh();
    } catch (err) {
      log.exception(err, 'songs-list');
      toast.error(Response.parseError(err));
    } finally {
      setLoading(false);
    }
  };

  const onDelete = (id: bigint) => {
    setSongId(id);
  };

  const onClose = () => {
    setIsOpen(false);
    setSongId(undefined);
  };

  useEffect(() => {
    if (!songId) return;
    setIsOpen(true);
  }, [songId]);

  return (
    <>
      <ConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={onConfirm}
        subtitle="Are you sure you want to delete this song?"
        loading={loading}
      />
      <div className="flex w-full overflow-x-auto select-none pb-12">
        {songs.length != 0 ? (
          <table className="table-hover table">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Artist</th>
                <th>Album</th>
                <th>Date added</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {songs.map((song, index) => (
                <SongRow
                  key={song.id.toString()}
                  song={song}
                  index={index}
                  onDelete={onDelete}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <p className="opacity-60 text-center w-full">No songs found.</p>
        )}
      </div>
    </>
  );
};

export default SongsList;
