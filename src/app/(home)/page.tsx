import Link from 'next/link';
import { FiMusic } from '@react-icons/all-files/fi/FiMusic';
import { FaPlay } from '@react-icons/all-files/fa/FaPlay';
import { FaSearch } from '@react-icons/all-files/fa/FaSearch';
import { FaArrowRight } from '@react-icons/all-files/fa/FaArrowRight';
import { PiPlaylistBold } from '@react-icons/all-files/pi/PiPlaylistBold';

import { getUser } from '@/services/server/session';
import Section from '@/components/section/main-section';
import WelcomeHeader from '@/components/ui/welcome-header';
import {
  getLastPlayedPlaylists,
  getUserPlaylists,
} from '@/services/server/playlist';
import { getLastPlayedSongs } from '@/services/server/song';
import HomePlaylists from '@/components/playlist/home-playlists';

import FeatureCard from './components/feature-card';
import RegisterButton from '@/components/ui/register-button';

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
    <div className="p-6 space-y-12">
      <div className="space-y-3">
        <WelcomeHeader />
        <p className="opacity-60">
          A web music player where you can listen & add your favorite songs to
          your customized playlists.
        </p>
      </div>
      <div className="flex flex-wrap w-full flex-col sm:flex-row items-center sm:items-stretch sm:justify-normal gap-6">
        <FeatureCard
          icon={<PiPlaylistBold />}
          title="Manage Your Playlists"
          subtitle="Add customized playlists to your library."
        />
        <FeatureCard
          icon={<FiMusic />}
          title="Songs Management"
          subtitle="Add songs to your customized playlists."
        />
        <FeatureCard
          icon={<FaPlay className="text-xl" />}
          title="Global Music Player"
          subtitle="Play your playlists and songs in a global music player."
        />
        <FeatureCard
          icon={<FaSearch className="text-2xl" />}
          title="Search Your Songs"
          subtitle="Search any song in all of your playlists at once."
        />
        <FeatureCard
          icon={<FaSearch className="text-2xl" />}
          title="Recent Songs"
          subtitle="See your recently played songs and playlists."
        />
        <FeatureCard
          icon={<FaSearch className="text-2xl" />}
          title="Customize Your Songs"
          subtitle="Change the name and image of your songs with ease."
        />
      </div>
      <div className="space-y-8">
        <div className="space-y-3">
          <h1 className="text-3xl lg:text-4xl font-bold">
            Are you ready to join the journey?
          </h1>
          <p className="opacity-60">
            Create an account now for free and enjoy listening to your favorite
            songs wherever you are!
          </p>
        </div>
        <RegisterButton
          title="Sign up"
          className="btn w-56 btn-secondary opacity-100"
        />
      </div>
      <div className="space-y-8">
        <div className="space-y-3">
          <Link
            href="/about"
            className="text-xl lg:text-2xl font-bold underline flex gap-3 items-center w-fit"
          >
            <p>About Us</p>
            <FaArrowRight className="text-2xl" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
