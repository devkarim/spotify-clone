'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';

import useLoginModal from '@/hooks/use-login-modal';
import Image from 'next/image';

interface AppbarProps {
  isSignedIn?: boolean;
  name?: string | null;
  imageUrl?: string | null;
}

const Appbar: React.FC<AppbarProps> = ({ isSignedIn, name, imageUrl }) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  return (
    <div className="flex justify-between p-6">
      <div className="flex gap-2">
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
      <div className="flex gap-8 items-center">
        <Link
          href="/premium"
          className="font-bold opacity-60 hover:opacity-100"
        >
          Premium
        </Link>
        <div className="divider divider-vertical before:bg-white after:bg-white m-0 h-8" />
        {isSignedIn ? (
          <span
            className="tooltip tooltip-bottom"
            data-tooltip={name || 'Guest'}
          >
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
              onClick={() => loginModal.onOpen('register')}
            >
              Sign up
            </button>
            <button
              className="btn btn-secondary btn-rounded w-32"
              onClick={() => loginModal.onOpen('login')}
            >
              Log in
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Appbar;
