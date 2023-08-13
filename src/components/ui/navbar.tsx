'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  MdArrowBackIos,
  MdArrowForwardIos,
  MdHome,
  MdSearch,
} from 'react-icons/md';

import useLoginModal from '@/hooks/use-login-modal';
import useScroll from '@/hooks/use-scroll';
import { cn } from '@/lib/utils';

interface NavbarProps {
  isSignedIn?: boolean;
  name?: string | null;
  imageUrl?: string | null;
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({
  isSignedIn,
  name,
  imageUrl,
  className,
}) => {
  const router = useRouter();
  const offset = useScroll((state) => state.offset);
  const loginModal = useLoginModal();

  return (
    <div
      className={cn(
        'flex justify-between sticky top-0 z-50 p-6 bg-opacity-0 transition-colors duration-300 backdrop-blur-lg',
        offset > 25 && 'bg-opacity-30',
        offset > 100 && 'bg-opacity-60',
        className
      )}
    >
      <div>
        <div className="space-x-2 hidden lg:block">
          <button className="btn btn-circle bg-black">
            <MdArrowBackIos
              className="ml-1 text-xl"
              onClick={() => router.back()}
            />
          </button>
          <button className="btn btn-circle bg-black">
            <MdArrowForwardIos
              className="ml-1 text-xl"
              onClick={() => router.forward()}
            />
          </button>
        </div>
        <div className="space-x-2 block lg:hidden">
          <Link
            href="/"
            className="btn btn-circle bg-white text-black text-2xl"
          >
            <MdHome />
          </Link>
          <Link
            href="/search"
            className="btn btn-circle bg-white text-black text-2xl"
          >
            <MdSearch />
          </Link>
        </div>
      </div>
      <div className="flex gap-8 items-center">
        <Link
          href="/premium"
          className="font-bold opacity-60 hover:opacity-100"
        >
          Premium
        </Link>
        <div className="divider divider-vertical before:bg-white after:bg-white m-0 h-8" />
        {isSignedIn ? (
          <span className="tooltip tooltip-left" data-tooltip={name || 'Guest'}>
            <div className="relative avatar h-10 w-10">
              <Image
                src={imageUrl || '/img/default-avatar.jpg'}
                alt="profile-pic"
                fill
              />
            </div>
          </span>
        ) : (
          <>
            <button
              className="font-bold opacity-60 hover:opacity-100"
              onClick={() => loginModal.show('register')}
            >
              Sign up
            </button>
            <button
              className="btn btn-secondary btn-rounded w-32"
              onClick={() => loginModal.show('login')}
            >
              Log in
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
