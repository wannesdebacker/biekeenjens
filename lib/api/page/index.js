import { request } from 'lib/datocms';

const HOMEPAGE_QUERY = `
query getPage($slug: String!, $locale: SiteLocale!) {
  page: page(filter: {slug: {eq: $slug}}, locale: $locale) {
    title
    showInMenu
    blocks {
      __typename
      
      ...on HeaderRecord {
        title
        titleSub
        datum
        datum2
        logo {
          url
          alt
        }
        image {
          url
          alt
        }
        links {
          id
          title
          slug
        }
        small
      }
      ...on TextRecord {
        title
        text
        image {
          url
          alt
        }
        floatImage
        floatRight
      }
      ...on GallerijRecord {
        title
        text
        images {
          id
          url
          alt
        }
      }
      ...on CallToActionRecord {
        title
        text
        links {
          id
          title
          slug
        }
      }
      ...on VideoRecord {
        title
        text
        youtubeId
      }
      ...on CheckinRecord {
        title
        text
        succesMessage
      }
    }
  }
  allPages: allPages(orderBy: [ id_ASC ], filter: { showInMenu: { eq: true } }, locale: $locale) {
    title
    slug
  },
  footer: footer(locale: $locale) {
    field1
    field2
    field3
    field4
  }
}
`;

export async function getPageData(slug = '', locale, preview) {
  const calculatedSlug = slug || 'homepage';

  try {
    const data = await request({
      query: HOMEPAGE_QUERY,
      variables: { slug: calculatedSlug, locale: locale || 'nl' },
    });

    const page = data?.page;
    const allPages = data?.allPages;
    const footer = data?.footer;

    return {
      page,
      allPages,
      footer,
    };
  } catch (error) {
    console.log('Something went wrong: ', error);
    return null;
  }
}
