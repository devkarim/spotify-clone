import './globals.css';
import 'react-toastify/dist/ReactToastify.css';

import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';

import Sidebar from '@/components/sidebar/main-sidebar';
import LoginModal from '@/components/modals/login-modal';
import PlaylistModal from '@/components/modals/playlist-modal';
import AuthProvider from '@/components/providers/auth-provider';
import ToastProvider from '@/components/providers/toast-provider';

const font = Figtree({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Spotify - Listen to Music wherever you are',
  description: 'Web music player to listen to your favorite songs.',
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
          <Sidebar>{children}</Sidebar>
        </AuthProvider>
      </body>
    </html>
  );
}
