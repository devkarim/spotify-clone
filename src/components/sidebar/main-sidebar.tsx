import { cn } from '@/lib/utils';
import Navbar from '@/components/ui/navbar';
import { getUser } from '@/services/server/session';
import WelcomeHeader from '@/components/ui/welcome-header';
import { getUserPlaylists } from '@/services/server/playlist';
import MainContainer from '@/components/ui/main-container';
import HomePlaylists from '@/components/playlist/home-playlists';

import SidebarRoutes from './sidebar-routes';
import SidebarLibrary from './sidebar-library';

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
        <MainContainer
          className={cn(
            'bg-backgroundSecondary h-full w-full overflow-y-auto bg-no-repeat bg-local',
            isSignedIn &&
              'bg-gradient-to-b from-blue-800/40 bg-[length:100%_300px]'
          )}
        >
          <Navbar
            isSignedIn={isSignedIn}
            name={user?.name}
            imageUrl={user?.image}
            className={cn('bg-primary', isSignedIn && 'bg-blue-950')}
          />
          {isSignedIn && (
            <div className="p-6 space-y-6">
              <WelcomeHeader />
              <HomePlaylists playlists={playlists} />
            </div>
          )}
          {children}
        </MainContainer>
      </div>
    </div>
  );
};

export default Sidebar;
