import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const useCatalogTranslations = () => {
  const { t: localize } = useTranslation();

  const SORTBY_TRANSLATED_TO_ENGLISH = useMemo(
    () => ({
      [localize('catalog.newest')]: 'newest',
      [localize('catalog.alphabetically')]: 'alphabetically',
      [localize('catalog.cheapest')]: 'cheapest',
    }),
    [localize],
  );

  const SORTBY_KEYS = useMemo(
    () => Object.keys(SORTBY_TRANSLATED_TO_ENGLISH),
    [SORTBY_TRANSLATED_TO_ENGLISH],
  );

  const localizedSortOptions = useMemo(
    () => SORTBY_KEYS.map(key => localize(key)),
    [SORTBY_KEYS, localize],
  );

  const ITEMS_ON_PAGE = useMemo(
    () => [localize('catalog.all'), '4', '8', '16'],
    [localize],
  );

  return {
    SORTBY_TRANSLATED_TO_ENGLISH,
    localizedSortOptions,
    ITEMS_ON_PAGE,
  };
};

export default useCatalogTranslations;
