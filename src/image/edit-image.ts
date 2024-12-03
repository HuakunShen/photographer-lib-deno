import { ExifTool, ExifDateTime } from "exiftool-vendored";

export function setImageOriginalDate(imagePath: string, date: ExifDateTime) {
  const loader = new ExifTool();
  return loader
    .write(
      imagePath,
      {
        DateTimeOriginal: date,
      },
      {
        writeArgs: ["-overwrite_original"],
      }
    )
    .finally(() => loader.end());
}

export function batchSetImageOriginalDate(
  imagePaths: string[],
  date: ExifDateTime
) {
  const loader = new ExifTool();
  return Promise.all(
    imagePaths.map((path) =>
      loader.write(
        path,
        {
          DateTimeOriginal: date,
          ModifyDate: date,
          CreateDate: date,
        },
        { writeArgs: ["-overwrite_original"] }
      )
    )
  ).finally(() => loader.end());
}

/**
 * Given a list of images captured together, update the date of them based on one of them
 * An offset is computed between targetDate and the DateTimeOriginal of baseImagePath
 * Then this offset is added to the DateTimeOriginal of all images based on their relative date difference from the base image
 * @example
 * ```ts
 * await image.batchSetImageOriginalDate(
 *   [
 *     "/Users/hk/Desktop/edit-image-time/_DSC2420.ARW",
 *     "/Users/hk/Desktop/edit-image-time/_DSC2422.ARW",
 *     "/Users/hk/Desktop/edit-image-time/_DSC2423.ARW",
 *     "/Users/hk/Desktop/edit-image-time/_DSC2424.ARW",
 *     "/Users/hk/Desktop/edit-image-time/_DSC2425.ARW",
 *     "/Users/hk/Desktop/edit-image-time/_DSC2427.ARW",
 *     "/Users/hk/Desktop/edit-image-time/_DSC2428.ARW",
 *   ],
 *   "/Users/hk/Desktop/edit-image-time/_DSC2424.ARW",
 *   ExifDateTime.from(new Date(2024, 10, 1, 15, 0, 0, 0).toISOString())
 * );
 * ```
 * @param imagePaths absolute paths to the images
 * @param baseImagePath absolute path to the base image
 * @param targetDate iso date in ExifDateTime format
 * @returns
 */
export function batchSmartSetImageOriginalDate(
  imagePaths: string[],
  baseImagePath: string,
  targetDate: ExifDateTime
) {
  // Read metadata for all images
  const loader = new ExifTool();
  return loader
    .read(baseImagePath)
    .then(async (baseTags) => {
      const baseOriginalDate = baseTags.DateTimeOriginal;
      if (!baseOriginalDate) {
        throw new Error("Base image has no DateTimeOriginal");
      }

      // Calculate offset between target and base dates
      const targetMillis = targetDate.toMillis();
      const baseMillis = ExifDateTime.from(baseOriginalDate)!.toMillis();
      const offsetMillis = targetMillis - baseMillis;

      // Read all image tags
      const allTags = await Promise.all(
        imagePaths.map((path) => loader.read(path))
      );

      // Update each image with offset-adjusted date
      return Promise.all(
        allTags.map((tags, i) => {
          const originalDate = tags.DateTimeOriginal;
          if (!originalDate) {
            throw new Error(`Image ${imagePaths[i]} has no DateTimeOriginal`);
          }

          const imageMillis = ExifDateTime.from(originalDate)!.toMillis();
          const newMillis = imageMillis + offsetMillis;
          const newDate = ExifDateTime.fromMillis(newMillis);

          //   return setImageOriginalDate(imagePaths[i], newDate);
          return loader.write(
            imagePaths[i],
            {
              DateTimeOriginal: newDate,
              ModifyDate: newDate,
              CreateDate: newDate,
            },
            {
              writeArgs: ["-overwrite_original"],
            }
          );
        })
      ).then(() => Promise.resolve());
    })
    .finally(() => loader.end());
}

export function batchSetImageGPS(
  imagePaths: string[],
  gps: {
    latitude?: number;
    latitudeRef?: string;
    longitude?: number;
    longitudeRef?: string;
    altitude?: number;
    altitudeRef?: string;
    mapDatum?: string;
  }
) {
  const exif = new ExifTool();
  return Promise.all(
    imagePaths.map((p) =>
      exif.write(
        p,
        {
          GPSLatitude: gps.latitude,
          GPSLatitudeRef: gps.latitudeRef,
          GPSLongitude: gps.longitude,
          GPSLongitudeRef: gps.longitudeRef,
          GPSAltitude: gps.altitude,
          GPSAltitudeRef: gps.altitudeRef,
          GPSMapDatum: gps.mapDatum,
        },
        { writeArgs: ["-overwrite_original"] }
      )
    )
  ).finally(() => exif.end());
}
