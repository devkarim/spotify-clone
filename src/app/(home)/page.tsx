import { getUser } from '@/services/server/session';
import Section from '@/components/section/main-section';
import WelcomeHeader from '@/components/ui/welcome-header';
import { getUserPlaylists } from '@/services/server/playlist';
import HomePlaylists from '@/components/playlist/home-playlists';

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = async ({}) => {
  const user = await getUser();
  const playlists = await getUserPlaylists(user?.id);

  const isSignedIn = user?.isAuthenticated;

  return (
    <>
      {isSignedIn && (
        <div className="p-6 space-y-6">
          <WelcomeHeader />
          <HomePlaylists playlists={playlists} />
        </div>
      )}
      <div className="p-6 pt-0 space-y-8">
        {isSignedIn && (
          <Section
            title="Recently Played"
            items={playlists.map((p) => ({
              title: p.name,
              subtitle: 'Playlist - 0 songs',
              imageUrl: p.imageUrl,
            }))}
          />
        )}
        {isSignedIn && (
          <Section
            title="New picks"
            items={playlists.map((p) => ({
              title: p.name,
              subtitle: 'Playlist - 0 songs',
              imageUrl: p.imageUrl,
            }))}
          />
        )}
        {isSignedIn && (
          <Section
            title="Welcome to 2023!"
            items={playlists.map((p) => ({
              title: p.name,
              subtitle: 'Playlist - 0 songs',
              imageUrl: p.imageUrl,
            }))}
          />
        )}
      </div>
    </>
  );
};

export default HomePage;
