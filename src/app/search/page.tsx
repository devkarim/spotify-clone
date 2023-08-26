'use client';

import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
// import { FaSearch } from 'react-icons/fa';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaSearch } from '@react-icons/all-files/fa/FaSearch';

import { Song } from '@prisma/client';

import log from '@/lib/log';
import Response from '@/types/server';
import Input from '@/components/ui/input';
import Container from '@/components/ui/container';
import { searchSongs } from '@/services/client/song';
import SpinnerRing from '@/components/ui/spinner-ring';
import SectionItemList from '@/components/section/section-item-list';

interface SearchPageProps {}

const SearchPage: React.FC<SearchPageProps> = ({}) => {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const router = useRouter();
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);

  const onQueryChange = (q: string) => {
    if (q.length == 0) return router.push('/search');
    router.push('/search?q=' + q);
  };

  const search = async (signal: AbortSignal) => {
    if (!query) return;
    setLoading(true);
    try {
      const songs = await searchSongs(query, signal);
      setSongs(songs);
    } catch (err) {
      log.exception(err, 'search-page');
      toast.error(Response.parseError(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!query) {
      setSongs([]);
      return;
    }
    const controller = new AbortController();
    search(controller.signal);
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <Container className="w-full space-y-16">
      <Input
        placeholder="What do you want to listen?"
        left={<FaSearch />}
        className="input-rounded input-xl max-w-lg"
        defaultValue={query || ''}
        onBlur={(e) => onQueryChange(e.target.value)}
        onKeyUp={(e) =>
          e.key == 'Enter' && onQueryChange(e.currentTarget.value)
        }
        full
      />
      {songs.length !== 0 ? (
        <SectionItemList
          items={songs.map((s) => ({
            title: s.name,
            subtitle: s.artist || 'Unknown artist',
            imageUrl: s.imageUrl,
            song: s,
          }))}
        />
      ) : loading ? (
        <div className="w-full flex justify-center">
          <SpinnerRing />
        </div>
      ) : (
        <p className="opacity-60 text-center">
          {query.length === 0 ? 'Search for any song.' : 'No songs found.'}
        </p>
      )}
    </Container>
  );
};

export default SearchPage;
