/* eslint-disable @next/next/no-page-custom-font */

import { LoadingProvider } from 'context/loading';
import Head from 'next/head';
import 'scss/elements/index.scss';
import Navigation from 'components/Navigation';
import Footer from 'components/Footer';
import { appWithTranslation } from 'next-i18next';

function MyApp({ Component, pageProps, locale }) {
  const { page, allPages, footer } = pageProps.data || {};

  return (
    <>
      <Head>
        {!!page?.title && <title>{page?.title}</title>}
        <meta name="robots" content="noindex" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Source+Sans+Pro:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <LoadingProvider value={{ loading: true }}>
        <Navigation pages={allPages} />
        {locale}
        <Component {...pageProps} />
        <Footer
          field1={footer?.field1}
          field2={footer?.field2}
          field3={footer?.field3}
          field4={footer?.field4}
        />
      </LoadingProvider>
    </>
  );
}

export default appWithTranslation(MyApp);

/* eslint-enable @next/next/no-page-custom-font */
