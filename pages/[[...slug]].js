import { getPageData } from 'lib/api/page';
import Page from 'components/Page';
import Header from 'components/Header';

export async function getServerSideProps(context) {
  const data = await getPageData(context?.params?.slug[0]);

  return {
    props: { data },
  };
}

export default function Home({ data }) {
  if (!data) {
    return null;
  }

  const { page } = data;

  return (
    <Page>
      <Header title={page?.headerTitle} intro={page?.intro} />
    </Page>
  );
}
