import { exiftool, type Tags } from "exiftool-vendored";
import type { ImageGPSMetadata, ImageMetadata } from "../types/image.ts";

/**
 * Read image metadata (tags or exif) using exiftool
 * @param imagePath
 * @returns
 */
export async function readImageTags(imagePath: string): Promise<Tags> {
  const tags = await exiftool.read(imagePath);
  await exiftool.end();
  return tags;
}

/**
 * Parse image GPS metadata
 * @param tags
 * @returns
 */
export function parseImageGPS(tags: Tags): ImageGPSMetadata {
  return {
    latitude: tags.GPSLatitude,
    latitudeRef: tags.GPSLatitudeRef,
    longitude: tags.GPSLongitude,
    longitudeRef: tags.GPSLongitudeRef,
    altitude: tags.GPSAltitude,
    altitudeRef: tags.GPSAltitudeRef,
    mapDatum: tags.GPSMapDatum,
  };
}

/**
 * Given exiftool tags, return useful image metadata as a flat object
 * @param tags
 * @returns
 */
export function parseImageMetadata(tags: Tags): ImageMetadata {
  return {
    ...parseImageGPS(tags),
    width: tags.ImageWidth,
    height: tags.ImageHeight,
    bitsPerSample: tags.BitsPerSample,
    fileSize: tags.FileSize,
    make: tags.Make,
    model: tags.Model,
    dateCreated: tags.DateCreated ?? tags.CreateDate,
    dateModified: tags.ModificationDate,
    focalLength: tags.FocalLength,
    focalLength35efl: tags.FocalLength35efl,
    focalLengthIn35mmFormat: tags.FocalLengthIn35mmFormat,
    fNumber: tags.Fnumber, // e.g. f/2.8,
    exposureTime: tags.ExposureTime,
    exposureMode: tags.ExposureMode,
    exposureProgram: tags.ExposureProgram,
  };
}

/**
 * @example
 * ```ts
 * import { image } from "./mod.ts";
 * const imagePath = "/Users/user/Pictures/DJI_20241006140443_0154_D.DNG";
 * image.readImageMetadata(imagePath).then(console.log);
 * ```
 * @param imagePath
 * @returns
 */
export function readImageMetadata(imagePath: string): Promise<ImageMetadata> {
  return readImageTags(imagePath).then(parseImageMetadata);
}
