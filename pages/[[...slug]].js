import { getPageData } from 'lib/api/page';
import Page from 'components/Page';

import ComponentMatrix from 'components/ComponentMatrix';

export async function getServerSideProps({ query, locale }) {
  const slug = query?.slug?.[0] || 'homepage';
  const data = await getPageData(slug, locale || 'nl');

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
      <ComponentMatrix blocks={page?.blocks} />
    </Page>
  );
}
