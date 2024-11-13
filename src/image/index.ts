import sharp from "sharp";

export * from "./info.ts";
export * from "./compress.ts";
export function toFormat(imagePath: string) {
  return sharp(imagePath).toFormat;
}
