import Navbar from '@/components/ui/navbar';
import Player from '@/components/player/main-player';
import { getUser } from '@/services/server/session';
import MainContainer from '@/components/ui/main-container';
import { getUserPlaylists } from '@/services/server/playlist';

import Sidebar from './main-sidebar';

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
          <MainContainer isSignedIn={isSignedIn}>
            <Navbar
              isSignedIn={isSignedIn}
              name={user?.name}
              imageUrl={user?.image}
            />
            {children}
          </MainContainer>
        </div>
      </div>
      {isSignedIn && <Player />}
    </div>
  );
};

export default SidebarContent;
