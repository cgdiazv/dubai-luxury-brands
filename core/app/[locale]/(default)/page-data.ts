import { cache } from 'react';

import { client } from '~/client';
import { graphql } from '~/client/graphql';
import { revalidate } from '~/client/revalidate-target';
import { FeaturedProductsCarouselFragment } from '~/components/featured-products-carousel/fragment';
import { FeaturedProductsListFragment } from '~/components/featured-products-list/fragment';
import { FooterFragment, FooterSectionsFragment } from '~/components/footer/fragment';
import { CurrencyCode, HeaderFragment, HeaderLinksFragment } from '~/components/header/fragment';

export const LayoutQuery = graphql(
  `
    query LayoutQuery {
      site {
        ...HeaderFragment
        ...FooterFragment
      }
    }
  `,
  [HeaderFragment, FooterFragment],
);

const GiftCertificatesEnabledFragment = graphql(`
  fragment GiftCertificatesEnabledFragment on Settings {
    giftCertificates(currencyCode: $currencyCode) {
      isEnabled
    }
  }
`);

export const GetLinksAndSectionsQuery = graphql(
  `
    query GetLinksAndSectionsQuery($currencyCode: currencyCode) {
      site {
        settings {
          ...GiftCertificatesEnabledFragment
        }
        ...HeaderLinksFragment
        ...FooterSectionsFragment
      }
    }
  `,
  [HeaderLinksFragment, FooterSectionsFragment, GiftCertificatesEnabledFragment],
);

const HomePageQuery = graphql(
  `
    query HomePageQuery($currencyCode: currencyCode) {
      site {
        featuredProducts(first: 12) {
          edges {
            node {
              ...FeaturedProductsListFragment
            }
          }
        }
        newestProducts(first: 12) {
          edges {
            node {
              ...FeaturedProductsCarouselFragment
            }
          }
        }
        settings {
          inventory {
            defaultOutOfStockMessage
            showOutOfStockMessage
            showBackorderMessage
          }
          newsletter {
            showNewsletterSignup
          }
          tax {
            plp
          }
        }
      }
    }
  `,
  [FeaturedProductsCarouselFragment, FeaturedProductsListFragment],
);

export const getPageData = cache(
  async (currencyCode?: CurrencyCode, customerAccessToken?: string) => {
    const { data } = await client.fetch({
      document: HomePageQuery,
      customerAccessToken,
      variables: { currencyCode },
      fetchOptions: customerAccessToken ? { cache: 'no-store' } : { next: { revalidate } },
    });

    console.log('🔍 HomePage Data - Featured Products:', data?.site?.featuredProducts?.edges?.length);
    console.log('🔍 HomePage Data - Newest Products:', data?.site?.newestProducts?.edges?.length);
    
    // Check if products are present
    if (data?.site?.featuredProducts?.edges?.length === 0) {
      console.log('⚠️ Featured Products: API returned EMPTY. This could mean:');
      console.log('   1. No products marked as featured in BigCommerce');
      console.log('   2. Featured products have no prices');
      console.log('   3. Featured products are not published');
    }
    
    if (data?.site?.featuredProducts?.edges?.length > 0) {
      console.log('✅ Featured Products found. First product:', JSON.stringify(data.site.featuredProducts.edges[0], null, 2));
    }

    return data;
  },
);
