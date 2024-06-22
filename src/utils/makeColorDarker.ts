import getHexFromColorName from './LiteralColorToHex';

export function makeColorDarker(color: string, percentage: number): string {
  // Function to convert hex to decimal
  function hexToDec(hex: string): number {
    return parseInt(hex, 16);
  }

  // Function to convert decimal to hex
  function decToHex(dec: number): string {
    const hex = dec.toString(16);

    return hex.length === 1 ? '0' + hex : hex;
  }

  // Function to convert RGB to hex
  function rgbToHex(r: number, g: number, b: number): string {
    return `#${decToHex(r)}${decToHex(g)}${decToHex(b)}`;
  }

  // Function to parse RGB string
  function parseRGB(rgb: string): [number, number, number] {
    const result = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

    if (!result) {
      throw new Error('Invalid RGB format');
    }

    return [
      parseInt(result[1], 10),
      parseInt(result[2], 10),
      parseInt(result[3], 10),
    ];
  }

  let hexColor = '';

  // Determine the color format
  if (color.startsWith('#')) {
    hexColor = color;
  } else if (color.startsWith('rgb')) {
    const [r, g, b] = parseRGB(color);

    hexColor = rgbToHex(r, g, b);
  } else {
    hexColor = getHexFromColorName(color);
  }

  // Extract the components
  const red = hexColor.slice(1, 3);
  const green = hexColor.slice(3, 5);
  const blue = hexColor.slice(5, 7);

  // Convert hex components to decimal
  const redDec = hexToDec(red);
  const greenDec = hexToDec(green);
  const blueDec = hexToDec(blue);

  // Decrease each component by the given percentage
  const factor = 1 - percentage / 100;
  let newRedDec = Math.round(redDec * factor);
  let newGreenDec = Math.round(greenDec * factor);
  let newBlueDec = Math.round(blueDec * factor);

  // Ensure new values are within the valid range [0, 255]
  newRedDec = Math.max(0, Math.min(255, newRedDec));
  newGreenDec = Math.max(0, Math.min(255, newGreenDec));
  newBlueDec = Math.max(0, Math.min(255, newBlueDec));

  // Convert new decimal components back to hex
  const newRedHex = decToHex(newRedDec);
  const newGreenHex = decToHex(newGreenDec);
  const newBlueHex = decToHex(newBlueDec);

  // Combine the new components into a hex color
  const newHexColor = `#${newRedHex}${newGreenHex}${newBlueHex}`;

  return newHexColor;
}
