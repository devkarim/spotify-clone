import { Playlist } from '@prisma/client';

import SidebarRoutes from './sidebar-routes';
import SidebarLibrary from './sidebar-library';

interface SidebarProps {
  playlists: Playlist[];
}

const Sidebar: React.FC<SidebarProps> = ({ playlists }) => {
  return (
    <div className="hidden lg:flex flex-col w-full max-w-sm space-y-2 p-2 font-semibold">
      <SidebarRoutes />
      <SidebarLibrary playlists={playlists} />
    </div>
  );
};

export default Sidebar;
