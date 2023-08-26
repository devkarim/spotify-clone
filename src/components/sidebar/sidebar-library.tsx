// import { VscLibrary } from 'react-icons/vsc';
import { VscLibrary } from '@react-icons/all-files/vsc/VscLibrary';

import Card from '@/components/ui/card';
import { PlaylsitWithSongCount } from '@/types/db';
import PlaylistCard from '@/components/playlist/playlist-card';

import SidebarCard from './sidebar-card';
import AddPlaylistButton from './add-playlist-button';

interface SidebarLibraryProps {
  playlists?: PlaylsitWithSongCount[];
}

const SidebarLibrary: React.FC<SidebarLibraryProps> = async ({
  playlists = [],
}) => {
  return (
    <SidebarCard className="h-full space-y-0 p-0">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2 cursor-pointer opacity-60 hover:opacity-100 transition-opacity">
          <div className="w-8">
            <VscLibrary className="text-2xl" />
          </div>
          <p>Your Library</p>
        </div>
        <AddPlaylistButton icon />
      </div>
      {playlists.length === 0 && (
        <Card className="m-4 space-y-6 hover:bg-section-card-active transition-colors">
          <div className="space-y-2">
            <h4>Create your first playlist</h4>
            <p className="text-sm opacity-60">
              Your Beats, Your Rules. Start making your playlist!
            </p>
          </div>
          <AddPlaylistButton />
        </Card>
      )}
      {playlists.length !== 0 && (
        <div className="p-2 space-y-2">
          {playlists.map((p) => (
            <PlaylistCard
              key={p.name}
              id={p.id}
              name={p.name}
              imageUrl={p.imageUrl}
              songs={p._count.songs}
            />
          ))}
        </div>
      )}
    </SidebarCard>
  );
};

export default SidebarLibrary;
