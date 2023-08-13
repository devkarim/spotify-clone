import Navbar from '@/components/ui/navbar';
import { getUser } from '@/services/server/session';
import { getUserPlaylists } from '@/services/server/playlist';
import HomePlaylists from '@/components/playlist/home-playlists';

import SidebarRoutes from './sidebar-routes';
import SidebarLibrary from './sidebar-library';
import WelcomeHeader from '../ui/welcome-header';

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = async ({ children }) => {
  const user = await getUser();
  const playlists = await getUserPlaylists(user?.id);

  const isSignedIn = user?.isAuthenticated;

  return (
    <div className="flex">
      <div className="flex flex-col h-screen w-full max-w-sm space-y-2 p-2 font-semibold">
        <SidebarRoutes />
        <SidebarLibrary playlists={playlists} />
      </div>
      <div className="w-full max-h-screen py-2">
        <div className="bg-backgroundSecondary h-full w-full overflow-y-auto bg-gradient-to-b from-blue-800/40 bg-[length:100%_300px] bg-no-repeat bg-local">
          <Navbar
            isSignedIn={isSignedIn}
            name={user?.name}
            imageUrl={user?.image}
          />
          {isSignedIn && (
            <div className="p-6 space-y-6">
              <WelcomeHeader />
              <HomePlaylists playlists={playlists} />
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
