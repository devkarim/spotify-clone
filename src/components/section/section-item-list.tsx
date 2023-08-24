'use client';

import { useRouter } from 'next/navigation';

import { Item } from '@/types/ui';

import SectionItem from './section-item';

interface SectionItemListProps {
  items: Item[];
}

const SectionItemList: React.FC<SectionItemListProps> = ({ items }) => {
  const router = useRouter();

  const onParentClick = (item: Item) => {
    const playlistId = item.song?.playlistId || item.playlist?.id;
    if (!playlistId) return;
    router.push(`/playlist/${playlistId}`);
  };

  return (
    <div className="flex gap-6 flex-wrap">
      {items.map((item) => (
        <SectionItem
          key={item.title}
          item={item}
          rounded={!!item.song}
          onParentClick={() => onParentClick(item)}
        />
      ))}
    </div>
  );
};

export default SectionItemList;
