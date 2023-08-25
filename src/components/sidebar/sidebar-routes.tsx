'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
// import { RiSearchLine, RiSearchFill } from 'react-icons/ri';
// import { PiHouseSimple, PiHouseSimpleFill } from 'react-icons/pi';
import { RiSearchLine } from '@react-icons/all-files/ri/RiSearchLine';
import { RiSearchFill } from '@react-icons/all-files/ri/RiSearchFill';
import { PiHouseSimpleBold } from '@react-icons/all-files/pi/PiHouseSimpleBold';
import { PiHouseSimpleFill } from '@react-icons/all-files/pi/PiHouseSimpleFill';

import { cn } from '@/lib/utils';

import SidebarCard from './sidebar-card';

interface SidebarRoutesProps {}

const SidebarRoutes: React.FC<SidebarRoutesProps> = ({}) => {
  const pathname = usePathname();

  const routes = useMemo(() => {
    return [
      {
        name: 'Home',
        path: '/',
        icon: <PiHouseSimpleBold className="text-3xl" />,
        iconActive: <PiHouseSimpleFill className="text-3xl" />,
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
    <SidebarCard className="space-y-5">
      <div className="flex flex-col gap-5">
        {routes.map((r) => (
          <Link
            href={r.path}
            key={r.name}
            className={cn('flex items-center gap-4 cursor-pointer', {
              'opacity-60 hover:opacity-100 transition-opacity': !r.active,
            })}
          >
            <div className="w-8">{r.active ? r.iconActive : r.icon}</div>
            <p>{r.name}</p>
          </Link>
        ))}
      </div>
    </SidebarCard>
  );
};

export default SidebarRoutes;
