'use client';

import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import log from '@/lib/log';
import Response from '@/types/server';
import { capatlize } from '@/lib/utils';
import Modal from '@/components/ui/modal';
import Input from '@/components/ui/input';
import FileInput from '@/components/ui/file-input';
import usePlaylistModal from '@/hooks/use-playlist-modal';
import { createPlaylist } from '@/services/client/playlist';
import { PlaylistSchema, playlistSchema } from '@/schemas/playlistSchema';
import ControlledFileInput from '../ui/controlled-file-input';

interface PlaylistModalProps {
  name?: string;
  imageUrl?: string;
}

const PlaylistModal: React.FC<PlaylistModalProps> = ({ name, imageUrl }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const playlistModal = usePlaylistModal();
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<PlaylistSchema>({
    resolver: zodResolver(playlistSchema),
    defaultValues: {
      name,
      imageUrl,
    },
  });

  const action = capatlize(playlistModal.status);

  const onSubmit = async (formData: PlaylistSchema) => {
    setLoading(true);
    try {
      if (playlistModal.status == 'create') {
        await create(formData);
      } else {
        await edit(formData);
      }
      playlistModal.hide();
      router.refresh();
    } catch (err) {
      log.exception(err, 'playlist-modal');
      toast.error(Response.parseError(err));
    } finally {
      setLoading(false);
    }
  };

  const create = async (formData: PlaylistSchema) => {
    const playlist = await createPlaylist(formData.name, formData.imageUrl);
    toast.success(`Created playlist "${playlist.name}"`);
  };

  const edit = async (formData: PlaylistSchema) => {
    toast.success(`Edited playlist "${name}"`);
  };

  useEffect(() => {
    if (playlistModal.isOpen) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playlistModal.isOpen]);

  return (
    <Modal
      isOpen={playlistModal.isOpen}
      onClose={playlistModal.hide}
      title={`${action} a playlist`}
      subtitle={`Create playlists that mirror your unique taste in music`}
      className="max-w-lg"
    >
      <div className="space-y-12">
        <form className="space-y-8">
          <Input
            id="name"
            type="text"
            label="Playlist name"
            placeholder="Your playlist name here"
            disabled={loading}
            error={errors.name?.message}
            full
            {...register('name')}
          />
          <ControlledFileInput
            name="imageUrl"
            controlProps={{
              name: 'imageUrl',
              control,
              rules: { required: true },
            }}
            label="Playlist image"
            className="min-w-full"
            accept="image/png, image/gif, image/jpeg"
            onUpload={() => setLoading(true)}
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
          {playlistModal.status == 'create' ? 'Create a playlist' : 'Edit'}
        </button>
      </div>
    </Modal>
  );
};

export default PlaylistModal;
