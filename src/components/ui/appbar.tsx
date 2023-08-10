'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';

interface AppbarProps {}

const Appbar: React.FC<AppbarProps> = ({}) => {
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
        <Link href="/signup" className="font-bold opacity-80 hover:opacity-100">
          Sign up
        </Link>
        <button className="btn btn-secondary btn-rounded">Log in</button>
      </div>
    </div>
  );
};

export default Appbar;
