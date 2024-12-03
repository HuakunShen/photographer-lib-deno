import sharp from "sharp";

export * from "./info.ts";
export * from "./compress.ts";
export * from "./utils.ts";
export * from "./edit-image.ts";

export function toFormat(imagePath: string) {
  return sharp(imagePath).toFormat;
}
