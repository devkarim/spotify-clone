'use client';

import { toast } from 'react-toastify';
import { RxPencil1 } from 'react-icons/rx';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useRef, useState } from 'react';

import log from '@/lib/log';
import upload from '@/services/client/cloudinary';
import MusicImage from '@/components/ui/music-image';
import AddSongButton from '@/components/ui/add-song-button';
import { updatePlaylist } from '@/services/client/playlist';

interface PlaylistHeaderProps {
  id: bigint;
  title: string;
  imageUrl?: string;
}

const PlaylistHeader: React.FC<PlaylistHeaderProps> = ({
  id,
  title,
  imageUrl,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const inputFile = useRef<HTMLInputElement | null>(null);

  const onBrowseNewPhoto = () => {
    if (loading) return;
    inputFile.current?.click();
  };

  const onUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    setLoading(true);
    const file = e.target.files[0];
    try {
      const imageUrl = await upload(file, 'image');
      await updatePlaylist(id, { name: title, imageUrl });
      toast.success('Playlist photo updated');
      router.refresh();
    } catch (err) {
      log.error(err, 'playlist-header');
      if (inputFile && inputFile.current) {
        inputFile.current.value = '';
      }
    } finally {
      setLoading(false);
    }
  };

  const onUpdateName = async (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    if (name === title) return;
    setLoading(true);
    try {
      await updatePlaylist(id, { name, imageUrl });
      toast.success('Playlist name updated');
      router.refresh();
    } catch (err) {
      log.error(err, 'playlist-header');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-12 items-center justify-between">
      <div className="flex flex-col sm:flex-row gap-6 items-center w-min sm:w-fit">
        <div className="group relative h-72 w-72 rounded-md overflow-hidden shadow-xl transition-opacity">
          <MusicImage imageUrl={imageUrl} className="group-hover:opacity-40" />
          <div
            className="flex flex-col justify-center items-center w-full h-full absolute opacity-0 group-hover:opacity-100 transition-opacity text-center select-none"
            onClick={onBrowseNewPhoto}
          >
            <RxPencil1 className="text-5xl" />
            <p className="text-lg w-full">Choose photo</p>
            <input
              type="file"
              id="file"
              ref={inputFile}
              onChange={onUpload}
              className="hidden"
            />
          </div>
        </div>
        <div className="self-start w-full sm:self-auto sm:w-fit space-y-4">
          <p>Playlist</p>
          <input
            className="bg-transparent font-bold text-5xl sm:text-7xl w-full focus:input focus:input-xl"
            defaultValue={title}
            onBlur={onUpdateName}
            disabled={loading}
          />
        </div>
      </div>
      <AddSongButton playlistId={id} />
    </div>
  );
};

export default PlaylistHeader;
