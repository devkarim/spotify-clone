'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
// import { FaEllipsisH, FaTrash } from 'react-icons/fa';
import { FaTrash } from '@react-icons/all-files/fa/FaTrash';
import { FaEllipsisH } from '@react-icons/all-files/fa/FaEllipsisH';

import log from '@/lib/log';
import Response from '@/types/server';
import usePlayer from '@/hooks/use-player';
import usePlaylist from '@/hooks/use-playlist';
import { deletePlaylist } from '@/services/client/playlist';
import ConfirmModal from '@/components/modals/confirm-modal';

interface PlaylistOptionsProps {
  playlistId: bigint;
  name: string;
}

const PlaylistOptions: React.FC<PlaylistOptionsProps> = ({
  name,
  playlistId,
}) => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const currentPlaylist = usePlaylist((state) => state.playlist);
  const resetCurrentPlaylist = usePlaylist((state) => state.reset);
  const currentSongPlaylistId = usePlayer((state) => state.playlistId);
  const resetCurrentSong = usePlayer((state) => state.reset);
  const router = useRouter();

  const onDelete = async () => {
    setLoading(true);
    try {
      await deletePlaylist(playlistId);
      if (currentPlaylist?.id == playlistId) {
        resetCurrentPlaylist();
      }
      if (currentSongPlaylistId == playlistId) {
        resetCurrentSong();
      }
      toast.success('Playlist deleted.');
      setOpen(false);
      router.refresh();
      router.replace('/');
    } catch (err) {
      log.exception(err, 'songs-list');
      toast.error(Response.parseError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ConfirmModal
        isOpen={isOpen}
        loading={loading}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        subtitle={`Are you sure you want to delete "${name}" playlist?`}
      />
      <div className="dropdown">
        <label className="m-2" tabIndex={0}>
          <span
            className="tooltip cursor-pointer"
            data-tooltip={`More options for ${name}`}
          >
            <FaEllipsisH className="mr-2 opacity-60" />
          </span>
        </label>
        <div className="dropdown-menu dropdown-menu-right w-40">
          <a
            className="dropdown-item text-sm"
            onClick={() => !loading && setOpen(true)}
          >
            <div className="flex gap-2">
              <FaTrash />
              <p>Delete</p>
            </div>
          </a>
        </div>
      </div>
    </>
  );
};

export default PlaylistOptions;
