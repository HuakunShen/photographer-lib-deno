import { type FormatEnum, Sharp } from "sharp";

/**
 * Simplified image compression, only accept a quality parameter
 * @param imagePath
 * @param format
 * @param quality between 1-100
 * @returns
 */
export function compressImage(
  image: Sharp,
  format: keyof FormatEnum,
  quality: number
): Sharp {
  return image.toFormat(format, { quality });
}

export function resizeImageByWidth(image: Sharp, width: number): Sharp {
  return image.resize({ width });
}

/**
 * Resize image by percentage while keeping the aspect ratio
 * @param image
 * @param percentage
 * @returns
 */
export function resizeByPercentage(
  image: Sharp,
  percentage: number
): Promise<Sharp> {
  return image.metadata().then((metadata) => {
    if (!metadata.width) {
      throw new Error("Width not found");
    }
    return image.resize({ width: metadata.width * percentage });
  });
}
