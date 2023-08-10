'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { PiHouseBold, PiHouseFill } from 'react-icons/pi';
import { RiSearchLine, RiSearchFill } from 'react-icons/ri';
import { FaPlus } from 'react-icons/fa';
import { VscLibrary } from 'react-icons/vsc';

import { cn } from '@/lib/utils';

import SidebarCard from './sidebar-card';
import Card from '../ui/card';

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const pathname = usePathname();

  const routes = useMemo(() => {
    return [
      {
        name: 'Home',
        path: '/',
        icon: <PiHouseBold className="text-3xl" />,
        iconActive: <PiHouseFill className="text-3xl" />,
        active: pathname == '/',
      },
      {
        name: 'Search',
        path: '/search',
        icon: <RiSearchLine className="ml-1 text-2xl" />,
        iconActive: <RiSearchFill className="ml-1 text-2xl" />,
        active: pathname == '/search',
      },
    ];
  }, [pathname]);

  return (
    <div className="flex">
      <div className="flex flex-col h-screen w-full max-w-sm space-y-2 p-2 font-semibold">
        <SidebarCard className="space-y-5">
          <div className="flex flex-col gap-5">
            {routes.map((r) => (
              <Link
                href={r.path}
                key={r.name}
                className={cn('flex items-center gap-4 cursor-pointer', {
                  'opacity-60 hover:opacity-100': !r.active,
                })}
              >
                <div className="w-8">{r.active ? r.iconActive : r.icon}</div>
                <p>{r.name}</p>
              </Link>
            ))}
          </div>
        </SidebarCard>
        <SidebarCard className="h-full space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer opacity-60 hover:opacity-100">
              <div className="w-8">
                <VscLibrary className="text-2xl" />
              </div>
              <p>Your Library</p>
            </div>
            <button className="btn btn-circle btn-ghost opacity-60 hover:opacity-100 w-8 h-8">
              <FaPlus />
            </button>
          </div>
          <Card className="space-y-6">
            <div className="space-y-2">
              <h4>Create your first playlist</h4>
              <p className="text-sm opacity-60">
                Your beats, your rules, start making your playlist!
              </p>
            </div>
            <button className="btn btn-secondary">Create playlist</button>
          </Card>
        </SidebarCard>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Sidebar;
