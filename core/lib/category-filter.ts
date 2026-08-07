import { cache } from 'react';

import { client } from '~/client';
import { graphql } from '~/client/graphql';
import { revalidate } from '~/client/revalidate-target';

export const ALLOWED_CATEGORIES = ['For Men', 'For Women', 'For Unisex', 'Wholesale'] as const;

const normalizeCategoryName = (name: string) => name.trim().toLowerCase();

const AllowedCategoryTreeQuery = graphql(`
  query AllowedCategoryTreeQuery {
    site {
      categoryTree {
        entityId
        name
      }
    }
  }
`);

const getAllowedCategoryOrderIndex = (name: string) =>
  ALLOWED_CATEGORIES.findIndex(
    (allowed) => normalizeCategoryName(allowed) === normalizeCategoryName(name),
  );

export function isAllowedCategoryName(name: string): boolean {
  return ALLOWED_CATEGORIES.some(
    (allowed) => normalizeCategoryName(allowed) === normalizeCategoryName(name),
  );
}

export function isWithinAllowedCategoryTree(categoryNames: readonly string[]): boolean {
  return categoryNames.some((name) => isAllowedCategoryName(name));
}

export const getAllowedCategoryEntityIds = cache(async (customerAccessToken?: string) => {
  const response = await client.fetch({
    document: AllowedCategoryTreeQuery,
    customerAccessToken,
    fetchOptions: customerAccessToken ? { cache: 'no-store' } : { next: { revalidate } },
  });

  const allowedEntityIds = response.data.site.categoryTree
    .filter((category) => isAllowedCategoryName(category.name))
    .map((category) => category.entityId);

  return [...new Set(allowedEntityIds)];
});

export function filterCategories<T extends { name: string }>(categories: readonly T[] | T[]): T[] {
  return [...categories]
    .filter((cat) => isAllowedCategoryName(cat.name))
    .sort((a, b) => {
      return getAllowedCategoryOrderIndex(a.name) - getAllowedCategoryOrderIndex(b.name);
    });
}

export function isProductInAllowedCategories(product: {
  categories?: {
    edges?: Array<{ node: { entityId?: number | null; name: string } } | null> | null;
  } | null;
}): boolean {
  if (!product.categories?.edges || product.categories.edges.length === 0) {
    return false;
  }

  const categoryNames = product.categories.edges
    .map((edge) => edge?.node?.name?.trim().toLowerCase())
    .filter((name): name is string => Boolean(name));

  return ALLOWED_CATEGORIES.some((allowed) =>
    categoryNames.includes(allowed.toLowerCase()),
  );
}

export function isProductInAllowedCategoryIds(
  product: {
    categories?: {
      edges?: Array<{ node: { entityId?: number | null } } | null> | null;
    } | null;
  },
  allowedCategoryEntityIds: readonly number[],
): boolean {
  if (!product.categories?.edges || product.categories.edges.length === 0) {
    return false;
  }

  const allowedCategoryEntityIdSet = new Set(allowedCategoryEntityIds);

  return product.categories.edges.some((edge) => {
    const entityId = edge?.node?.entityId;

    return entityId != null && allowedCategoryEntityIdSet.has(entityId);
  });
}
