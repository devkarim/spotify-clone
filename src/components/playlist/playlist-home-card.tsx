import Image from 'next/image';
import { FaPlay } from 'react-icons/fa';

interface PlaylistHomeCardProps {
  name: string;
  imageUrl: string;
}

const PlaylistHomeCard: React.FC<PlaylistHomeCardProps> = ({
  name,
  imageUrl,
}) => {
  return (
    <div className="group flex h-24 bg-card/60 hover:bg-card/100 rounded-md overflow-hidden transition-colors duration-300 justify-between items-center cursor-pointer">
      <div className="flex gap-4 h-full items-center">
        <div className="relative h-full w-24">
          <Image
            src={imageUrl}
            alt="playlist-home-card-image"
            className="object-cover"
            fill
          />
        </div>
        <p className="font-semibold text-lg">{name}</p>
      </div>
      <button className="btn btn-primary btn-circle text-black m-4 opacity-0 group-hover:opacity-100 hover:scale-105 transition-opacity duration-300 h-12 w-12">
        <FaPlay className="ml-1 text-lg" />
      </button>
    </div>
  );
};

export default PlaylistHomeCard;
