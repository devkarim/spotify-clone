import { getServerSession } from 'next-auth';

import { cn } from '@/lib/utils';
import authOptions from '@/config/auth';
import Appbar from '@/components/ui/appbar';
import { getPlaylistsByUser } from '@/services/server/playlist';
import HomePlaylists from '@/components/playlist/home-playlists';

import SidebarRoutes from './sidebar-routes';
import SidebarLibrary from './sidebar-library';
import WelcomeHeader from '../ui/welcome-header';

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = async ({ children }) => {
  const session = await getServerSession(authOptions);
  const playlists = await getPlaylistsByUser(session?.user.id);

  const isSignedIn = session?.user.isAuthenticated;

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
            name={session?.user.name}
            imageUrl={session?.user.image}
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
