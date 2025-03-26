/**
 * Modules dependencies.
 */

import { Layout } from '@/components/layout';
import '@/styles/globals.css';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';

/**
 * Export `App` component.
 */

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Layout>
        <ToastContainer />
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
}
