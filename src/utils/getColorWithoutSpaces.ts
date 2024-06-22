export const getColorWithoutSpaces = (color: string) => {
  if (color.includes(' ')) {
    const modifyColor = color.split(' ').join('').toLowerCase();

    return modifyColor;
  } else {
    return color;
  }
};
