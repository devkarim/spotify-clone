import Image from 'next/image';

import PlayButton from '../ui/play-button';

interface SectionItemProps {
  title: string;
  subtitle: string;
  imageUrl: string;
}

const SectionItem: React.FC<SectionItemProps> = ({
  title,
  subtitle,
  imageUrl,
}) => {
  return (
    <div className="group bg-section-card p-6 rounded-md space-y-2 cursor-pointer hover:bg-section-card-secondary transition-colors">
      <div className="relative h-40 w-40 rounded-md overflow-hidden">
        <Image src={imageUrl} alt="section-item-image" fill />
        <PlayButton className="absolute bottom-0 right-0" />
      </div>
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="text-sm opacity-60">{subtitle}</p>
    </div>
  );
};

export default SectionItem;
