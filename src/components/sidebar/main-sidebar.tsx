import { cn } from '@/lib/utils';
import Appbar from '@/components/ui/appbar';
import { getUserPlaylists } from '@/services/server/playlist';
import HomePlaylists from '@/components/playlist/home-playlists';

import SidebarRoutes from './sidebar-routes';
import SidebarLibrary from './sidebar-library';
import WelcomeHeader from '../ui/welcome-header';
import { getUser } from '@/services/server/session';

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
        <div className="bg-backgroundSecondary h-full w-full overflow-y-auto space-y-4">
          <Appbar
            isSignedIn={isSignedIn}
            name={user?.name}
            imageUrl={user?.image}
            parentClassName={cn({
              'bg-gradient-to-b from-blue-800/40': isSignedIn,
            })}
          >
            {isSignedIn && (
              <>
                <WelcomeHeader />
                <HomePlaylists playlists={playlists} />
              </>
            )}
          </Appbar>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
