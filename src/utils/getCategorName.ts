export const getCategorName = (
  phoneId: string | undefined,
  tabletId: string | undefined,
  accessoriesId: string | undefined,
) => {
  if (phoneId) {
    return '/phones';
  }

  if (tabletId) {
    return '/tablets';
  }

  if (accessoriesId) {
    return '/accessories';
  }

  return;
};
