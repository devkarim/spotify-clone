'use client';

import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import log from '@/lib/log';
import Response from '@/types/server';
import { capatlize } from '@/lib/utils';
import Modal from '@/components/ui/modal';
import Input from '@/components/ui/input';
import useSongModal from '@/hooks/use-song-modal';
import { createSong, editSong } from '@/services/client/song';
import { SongSchema, songSchema } from '@/schemas/songSchema';
import ControlledFileInput from '@/components/ui/controlled-file-input';
import Errors from '@/config/errors';

interface SongModalProps {}

const SongModal: React.FC<SongModalProps> = ({}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const songModal = useSongModal();
  const currentSong = songModal.song;
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<SongSchema>({
    resolver: zodResolver(songSchema),
  });

  const action = capatlize(songModal.status);

  const onSubmit = async (formData: SongSchema) => {
    setLoading(true);
    try {
      if (songModal.status == 'create') {
        await create(formData);
      } else {
        await edit(formData);
      }
      songModal.hide();
      router.refresh();
    } catch (err) {
      log.exception(err, 'song-modal');
      toast.error(Response.parseError(err));
    } finally {
      setLoading(false);
    }
  };

  const create = async (formData: SongSchema) => {
    if (!songModal.playlistId) throw Errors.invalidPlaylistId;
    const song = await createSong(songModal.playlistId, formData);
    toast.success(`Created song "${song.name}"`);
  };

  const edit = async (formData: SongSchema) => {
    if (!currentSong) throw Errors.invalidSongId;
    await editSong(currentSong.id, formData);
    toast.success(`Edited song successfully!`);
  };

  useEffect(() => {
    if (songModal.isOpen) {
      reset({
        name: currentSong?.name ?? '',
        imageUrl: currentSong?.imageUrl ?? undefined,
        album: currentSong?.album ?? '',
        artist: currentSong?.artist ?? '',
        songUrl: currentSong?.songUrl ?? '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [songModal.isOpen]);

  return (
    <Modal
      isOpen={songModal.isOpen}
      onClose={songModal.hide}
      title={`${action} a song`}
      subtitle={`Expand your playlist and ${songModal.status} tracks with ease`}
      className="max-w-lg"
    >
      <div className="space-y-12">
        <form className="space-y-8">
          <Input
            id="name"
            type="text"
            label="Song name"
            placeholder="Your song name here"
            disabled={loading}
            error={errors.name?.message}
            full
            {...register('name')}
          />
          <Input
            id="artist"
            type="text"
            label="Song artist (optional)"
            placeholder="Your song artist here"
            disabled={loading}
            error={errors.artist?.message}
            full
            {...register('artist')}
          />
          <Input
            id="album"
            type="text"
            label="Song album (optional)"
            placeholder="Your song album here"
            disabled={loading}
            error={errors.album?.message}
            full
            {...register('album')}
          />
          <ControlledFileInput
            name="songUrl"
            controlProps={{
              name: 'songUrl',
              control,
              rules: { required: true },
            }}
            label="Song file"
            className="min-w-full"
            accept=".mp3"
            resourceType="video"
            onUpload={() => setLoading(true)}
            onUploadError={(err) => toast.error(Response.parseError(err))}
            onDone={() => setLoading(false)}
            disabled={loading}
            full
          />
          <ControlledFileInput
            name="imageUrl"
            controlProps={{
              name: 'imageUrl',
              control,
            }}
            label="Song image (optional)"
            className="min-w-full"
            accept="image/*"
            resourceType="image"
            onUpload={() => setLoading(true)}
            onUploadError={(err) => toast.error(Response.parseError(err))}
            onDone={() => setLoading(false)}
            disabled={loading}
            full
          />
        </form>
        <button
          className="btn btn-block rounded-md btn-primary"
          type="submit"
          onClick={handleSubmit(onSubmit)}
          disabled={loading}
        >
          {songModal.status == 'create' ? 'Create a song' : 'Edit'}
        </button>
      </div>
    </Modal>
  );
};

export default SongModal;
