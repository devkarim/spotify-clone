import { cn } from '@/lib/utils';
import Navbar from '@/components/ui/navbar';
import { getUser } from '@/services/server/session';
import MainContainer from '@/components/ui/main-container';
import { getUserPlaylists } from '@/services/server/playlist';

import Sidebar from './main-sidebar';
import Player from '../ui/player';

interface SidebarContentProps {
  children: React.ReactNode;
}

const SidebarContent: React.FC<SidebarContentProps> = async ({ children }) => {
  const user = await getUser();
  const playlists = await getUserPlaylists(user?.id);

  const isSignedIn = user?.isAuthenticated;

  return (
    <div className="flex flex-col h-full max-h-screen">
      <div className="flex h-full overflow-y-auto">
        <Sidebar playlists={playlists} />
        <div className="relative w-full lg:py-2">
          <MainContainer
            headerClassName={cn(
              isSignedIn && 'bg-gradient-to-b from-blue-800/40'
            )}
          >
            <Navbar
              isSignedIn={isSignedIn}
              name={user?.name}
              imageUrl={user?.image}
              className={cn('bg-primary', isSignedIn && 'bg-blue-950')}
            />
            {children}
          </MainContainer>
        </div>
      </div>
      <Player />
    </div>
  );
};

export default SidebarContent;
