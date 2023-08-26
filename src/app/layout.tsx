import './globals.css';
import 'react-toastify/dist/ReactToastify.css';

import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';

import { APP_NAME } from '@/config/constants';
import SongModal from '@/components/modals/song-modal';
import LoginModal from '@/components/modals/login-modal';
import PlaylistModal from '@/components/modals/playlist-modal';
import AuthProvider from '@/components/providers/auth-provider';
import ToastProvider from '@/components/providers/toast-provider';
import SidebarContent from '@/components/sidebar/sidebar-content';
import SubscriptionaModal from '@/components/modals/subscription-modal';

const font = Figtree({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: `${APP_NAME} - Listen to Music everywhere`,
  description:
    'A web music player where you can listen & add your favorite songs to your customized playlists.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark">
      <body className={font.className}>
        <AuthProvider>
          <ToastProvider />
          <LoginModal />
          <PlaylistModal />
          <SongModal />
          <SubscriptionaModal />
          <SidebarContent>{children}</SidebarContent>
        </AuthProvider>
      </body>
    </html>
  );
}
