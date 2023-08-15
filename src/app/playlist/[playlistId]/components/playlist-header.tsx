import Image from 'next/image';

interface PlaylistHeaderProps {
  title: string;
  imageUrl: string;
}

const PlaylistHeader: React.FC<PlaylistHeaderProps> = ({ title, imageUrl }) => {
  return (
    <div className="flex gap-6 items-center">
      <div className="relative h-72 w-72 rounded-md overflow-hidden">
        <Image src={imageUrl} alt={title} fill className="object-cover" />
      </div>
      <div className="space-y-4">
        <p>Playlist</p>
        <h1 className="font-bold text-5xl sm:text-7xl">{title}</h1>
      </div>
    </div>
  );
};

export default PlaylistHeader;
