import { request } from 'lib/datocms';

const HOMEPAGE_QUERY = `
query getPage($slug: String!) {
  page: page(filter: {slug: {eq: $slug}}, locale: en) {
    title
    showInMenu
    
    headerTitle
    intro
  }
  allPages: allPages(orderBy: [ id_ASC ], filter: { showInMenu: { eq: true } }) {
    title
    slug
  }
}
`;

export async function getPageData(slug = '', locale, preview) {
  const calculatedSlug = slug || 'homepage';

  try {
    const data = await request({
      query: HOMEPAGE_QUERY,
      variables: { slug: calculatedSlug },
    });

    const page = data?.page;
    const allPages = data?.allPages;

    return {
      page,
      allPages,
    };
  } catch (error) {
    console.log('Something went wrong: ', error);
    return null;
  }
}
