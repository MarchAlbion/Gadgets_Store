function getLocalizedModelCountString(
  count: number,
  localize: (key: string, params: { count: number }) => string,
  i18n: { language: string },
) {
  // Handle singular case
  if (count === 1) {
    return localize('catalog.modelsCountSingular', { count });
  }

  // Handle plural case with Ukrainian-specific rules
  const lastDigit = count % 10;
  const isUkrainianLanguage = i18n.language === 'ua';

  if (isUkrainianLanguage) {
    // Ukrainian-specific plural rules
    const isSpecialCase = count >= 12 && count <= 14;

    if (lastDigit >= 2 && lastDigit <= 4 && !isSpecialCase) {
      return localize('catalog.modelsCountPlural', { count });
    } else {
      return localize('catalog.modelsCountPlural_1', { count });
    }
  }

  // Fallback for other languages or non-Ukrainian languages
  return localize('catalog.modelsCountPlural', { count });
}

export default getLocalizedModelCountString;
