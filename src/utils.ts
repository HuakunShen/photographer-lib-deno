/**
 * Parse frame rate from string to number
 * e.g. 60000/1001 -> 59.94
 * @param frameRate - Frame rate in string format
 * @returns Frame rate in number format
 */
export function parseFrameRate(frameRate: string) {
  const [numerator, denominator] = frameRate.split("/").map(Number);
  return numerator / denominator;
}

export function stringToNumber(
  value: string | number | undefined
): number | undefined {
  if (typeof value === "string") {
    return parseFloat(value);
  }
  return value;
}
