import type { ExifDateTime } from "exiftool-vendored";

export function exifDateTimeToDate(exifDateTime: ExifDateTime | string): Date {
  if (typeof exifDateTime === "string") {
    return new Date(exifDateTime);
  }
  return exifDateTime.toDate();
}
