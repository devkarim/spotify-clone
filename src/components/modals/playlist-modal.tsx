'use client';

import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { capatlize } from '@/lib/utils';
import Modal from '@/components/ui/modal';
import Input from '@/components/ui/input';
import usePlaylistModal from '@/hooks/use-playlist-modal';
import { PlaylistSchema, playlistSchema } from '@/schemas/playlistSchema';
import FileInput from '@/components/ui/file-input';
import log from '@/lib/log';
import { toast } from 'react-toastify';
import Response from '@/types/server';

interface PlaylistModalProps {
  name?: string;
  imageUrl?: string;
}

const PlaylistModal: React.FC<PlaylistModalProps> = ({
  name = '',
  imageUrl = '',
}) => {
  const [loading, setLoading] = useState(false);
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

  const onSubmit = (formData: PlaylistSchema) => {
    log.info(formData);
  };

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
          <Controller
            name="imageUrl"
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState: { error } }) => (
              <FileInput
                label="Playlist image"
                className="min-w-full"
                accept="image/png, image/gif, image/jpeg"
                onUpload={() => setLoading(true)}
                onUploadError={(err) => toast.error(Response.parseError(err))}
                onFinishUpload={() => setLoading(false)}
                onURLChange={(url) => field.onChange(url)}
                error={error?.message}
                disabled={loading}
                full
              />
            )}
          ></Controller>
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
