/* eslint-disable @next/next/no-page-custom-font */

import { LoadingProvider } from 'context/loading';
import Head from 'next/head';
import 'scss/elements/index.scss';
import Navigation from 'components/Navigation';
import Footer from 'components/Footer';

function MyApp({ Component, pageProps }) {
  const { page, allPages } = pageProps.data || {};

  return (
    <>
      <Head>
        {!!page?.title && <title>{page?.title}</title>}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;800;900&family=Source+Sans+Pro:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <LoadingProvider value={{ loading: true }}>
        <Navigation pages={allPages} />
        <Component {...pageProps} />
        <Footer />
      </LoadingProvider>
    </>
  );
}

export default MyApp;

/* eslint-enable @next/next/no-page-custom-font */
