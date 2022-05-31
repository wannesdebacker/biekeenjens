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
        content {
          value
        }
        image {
          url
          alt
        }
        floatImage
        floatRight
      }
      ...on GallerijRecord {
        title
        content {
          value
        }
        images {
          id
          url
          alt
        }
      }
      ...on CallToActionRecord {
        title
        content {
          value
        }
        links {
          id
          title
          slug
        }
      }
      ...on VideoRecord {
        title
        content {
          value
        }
        youtubeId
      }
      ...on CheckinRecord {
        title
        content {
          value
        }
        succesMessage
      }
      ...on PackageBlockRecord {
        title
        content {
          value
        }
        rekeningnummer
        paymentInstructions
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
  },
  packages: allPackages(locale: $locale) {
    id
    title
    description
    price
    image {
      id,
      url,
      alt
    }
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
    const packages = data?.packages;

    return {
      page,
      allPages,
      footer,
      packages,
    };
  } catch (error) {
    console.log('Something went wrong: ', error);
    return null;
  }
}
