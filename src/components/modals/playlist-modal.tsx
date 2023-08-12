'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { capatlize } from '@/lib/utils';
import Modal from '@/components/ui/modal';
import Input from '@/components/ui/input';
import usePlaylistModal from '@/hooks/use-playlist-modal';
import { PlaylistSchema, playlistSchema } from '@/schemas/playlistSchema';

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
            label="Name"
            placeholder="Your playlist name here"
            disabled={loading}
            error={errors.name?.message}
            full
            {...register('name')}
          />
        </form>
      </div>
    </Modal>
  );
};

export default PlaylistModal;
