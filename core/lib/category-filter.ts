export const ALLOWED_CATEGORIES = ['For Men', 'For Women', 'Unisex', 'Wholesale'];

export function filterCategories<T extends { name: string }>(categories: readonly T[] | T[]): T[] {
  return [...categories]
    .filter((cat) =>
      ALLOWED_CATEGORIES.some(
        (allowed) => allowed.toLowerCase() === cat.name.trim().toLowerCase(),
      ),
    )
    .sort((a, b) => {
      const indexA = ALLOWED_CATEGORIES.findIndex(
        (c) => c.toLowerCase() === a.name.trim().toLowerCase(),
      );
      const indexB = ALLOWED_CATEGORIES.findIndex(
        (c) => c.toLowerCase() === b.name.trim().toLowerCase(),
      );
      return indexA - indexB;
    });
}
