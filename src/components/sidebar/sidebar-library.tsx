import { VscLibrary } from 'react-icons/vsc';
import { FaPlus } from 'react-icons/fa';

import SidebarCard from './sidebar-card';
import Card from '../ui/card';

interface SidebarLibraryProps {}

const SidebarLibrary: React.FC<SidebarLibraryProps> = ({}) => {
  return (
    <SidebarCard className="h-full space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer opacity-60 hover:opacity-100 transition-opacity">
          <div className="w-8">
            <VscLibrary className="text-2xl" />
          </div>
          <p>Your Library</p>
        </div>
        <button className="btn btn-circle btn-ghost opacity-60 hover:opacity-100 w-8 h-8 transition-opacity">
          <FaPlus />
        </button>
      </div>
      <Card className="space-y-6">
        <div className="space-y-2">
          <h4>Create your first playlist</h4>
          <p className="text-sm opacity-60">
            Your Beats, Your Rules. Start making your playlist!
          </p>
        </div>
        <button className="btn btn-secondary">Create playlist</button>
      </Card>
    </SidebarCard>
  );
};

export default SidebarLibrary;
