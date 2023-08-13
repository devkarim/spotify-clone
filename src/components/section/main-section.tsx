import { Item } from '@/types/ui';

import SectionItemList from './section-item-list';

interface SectionProps {
  title: string;
  items: Item[];
}

const Section: React.FC<SectionProps> = ({ title, items }) => {
  return (
    <div className="space-y-6 rounded-md">
      <h1 className="text-xl lg:text-2xl font-bold">{title}</h1>
      <SectionItemList items={items} />
    </div>
  );
};

export default Section;
