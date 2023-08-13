import { Item } from '@/types/ui';

import SectionItem from './section-item';

interface SectionItemListProps {
  items: Item[];
}

const SectionItemList: React.FC<SectionItemListProps> = ({ items }) => {
  return (
    <div className="flex gap-6 flex-wrap">
      {items.map((item) => (
        <SectionItem key={item.title} {...item} />
      ))}
    </div>
  );
};

export default SectionItemList;
