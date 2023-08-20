import { getUser } from '@/services/server/session';
import Section from '@/components/section/main-section';
import WelcomeHeader from '@/components/ui/welcome-header';
import {
  getLastPlayedPlaylists,
  getUserPlaylists,
} from '@/services/server/playlist';
import HomePlaylists from '@/components/playlist/home-playlists';
import { getLastPlayedSongs } from '@/services/server/song';

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = async ({}) => {
  const user = await getUser();
  const playlists = await getUserPlaylists(user?.id);
  const lastPlayedPlaylists = await getLastPlayedPlaylists(user?.id);
  const lastPlayedSongs = await getLastPlayedSongs(user?.id);

  const isSignedIn = user?.isAuthenticated;

  if (isSignedIn) {
    return (
      <>
        <div className="p-6 space-y-6">
          <WelcomeHeader />
          <HomePlaylists playlists={playlists} />
        </div>
        <div className="p-6 pt-0 space-y-8">
          <Section
            title="Songs recently played"
            items={lastPlayedSongs.map((s) => ({
              title: s.name,
              subtitle: `Song`,
              imageUrl: s.imageUrl,
              song: s,
            }))}
          />
          <Section
            title="Playlists recently played"
            items={lastPlayedPlaylists.map((p) => ({
              title: p.name,
              subtitle: `Playlist - ${p._count.songs} songs`,
              imageUrl: p.imageUrl,
              playlist: p,
            }))}
          />
        </div>
      </>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <WelcomeHeader />
    </div>
  );
};

export default HomePage;
