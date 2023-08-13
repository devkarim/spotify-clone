import Section from '@/components/section/main-section';
import { getUserPlaylists } from '@/services/server/playlist';
import { getUser } from '@/services/server/session';

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = async ({}) => {
  const user = await getUser();
  const playlists = await getUserPlaylists(user?.id);

  const isSignedIn = user?.isAuthenticated;

  return (
    <div className="p-6 pt-0">
      <Section
        title="Recently Played"
        items={playlists.map((p) => ({
          title: p.name,
          subtitle: 'Playlist - 0 songs',
          imageUrl: p.imageUrl,
        }))}
      />
    </div>
  );
};

export default HomePage;
