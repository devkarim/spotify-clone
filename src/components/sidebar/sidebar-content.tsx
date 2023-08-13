import { cn } from '@/lib/utils';
import Navbar from '@/components/ui/navbar';
import { getUser } from '@/services/server/session';
import WelcomeHeader from '@/components/ui/welcome-header';
import MainContainer from '@/components/ui/main-container';
import { getUserPlaylists } from '@/services/server/playlist';
import HomePlaylists from '@/components/playlist/home-playlists';

import Sidebar from './sidebar';

interface SidebarContentProps {
  children: React.ReactNode;
}

const SidebarContent: React.FC<SidebarContentProps> = async ({ children }) => {
  const user = await getUser();
  const playlists = await getUserPlaylists(user?.id);

  const isSignedIn = user?.isAuthenticated;

  return (
    <div className="flex">
      <Sidebar playlists={playlists} />
      <div className="w-full max-h-screen lg:py-2">
        <MainContainer
          className={cn(
            isSignedIn &&
              'bg-gradient-to-b from-blue-800/40 bg-[length:100%_300px] rounded-lg'
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

export default SidebarContent;
