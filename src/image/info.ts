import { exiftool, type Tags, ExifTool } from "exiftool-vendored";
import type { ImageGPSMetadata, ImageMetadata } from "../types/image.ts";

/**
 * Read image metadata (tags or exif) using exiftool
 * @param imagePath
 * @returns
 */
export async function readImageTags(imagePath: string): Promise<Tags> {
  const loader = new ExifTool();
  const tags = await loader.read(imagePath);
  await loader.end();
  return tags;
}

export async function batchReadImageTags(
  imagePaths: string[]
): Promise<Tags[]> {
  const loader = new ExifTool();

  function readTags(imagePath: string): Promise<Tags | null> {
    return loader.read(imagePath).catch(() => null);
  }

  const tags = await Promise.all(imagePaths.map(readTags));
  await loader.end();
  return tags.filter((tag) => tag !== null);
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
    DateTimeOriginal: tags.DateTimeOriginal,
    FileModifyDate: tags.FileModifyDate,
    ModifyDate: tags.ModifyDate,
    CreateDate: tags.CreateDate,
    dateCreated: tags.DateCreated ?? tags.CreateDate,
    dateModified: tags.ModificationDate,
    focalLength: tags.FocalLength,
    focalLength35efl: tags.FocalLength35efl,
    focalLengthIn35mmFormat: tags.FocalLengthIn35mmFormat,
    FileFormat: tags.FileFormat,
    Quality: tags.Quality,
    RAWFileType: tags.RAWFileType,
    CameraOrientation: tags.CameraOrientation,
    FacesDetected: tags.FacesDetected,
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

export function batchReadImageMetadata(
  imagePaths: string[]
): Promise<ImageMetadata[]> {
  return batchReadImageTags(imagePaths).then((tags) => {
    // console.log("tags", tags);
    return tags.map(parseImageMetadata);
  });
}
