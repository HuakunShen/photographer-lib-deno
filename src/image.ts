import exiftool from "npm:exiftool-vendored";

/**
 * Read image metadata (tags or exif) using exiftool
 * @param imagePath
 * @returns
 */
export async function readImageTags(imagePath: string): Promise<exiftool.Tags> {
  const exifLoader = new exiftool.ExifTool();
  const tags = await exifLoader.read(imagePath);
  return tags;
}

/**
 * Parse image GPS metadata
 * @param tags
 * @returns
 */
export function parseImageGPS(tags: exiftool.Tags) {
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

export function parseImageMetadata(tags: exiftool.Tags) {
  return {
    // gps: parseImageGPS(tags),
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

export function readImageMetadata(imagePath: string) {
  return readImageTags(imagePath).then(parseImageMetadata);
}
