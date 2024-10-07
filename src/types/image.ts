import type { ExifDateTime } from "npm:exiftool-vendored@28.5.0";

export interface ImageGPSMetadata {
  latitude?: number;
  latitudeRef?: string;
  longitude?: number;
  longitudeRef?: string;
  altitude?: number;
  altitudeRef?: string;
  mapDatum?: string;
}

export interface ImageMetadata extends ImageGPSMetadata {
  width?: number;
  height?: number;
  bitsPerSample?: number;
  fileSize?: string;
  make?: string;
  model?: string;
  dateCreated?: string | ExifDateTime;
  dateModified?: string | ExifDateTime;
  focalLength?: string;
  focalLength35efl?: string;
  focalLengthIn35mmFormat?: string;
  fNumber?: string;
  exposureTime?: string;
  exposureMode?: string;
  exposureProgram?: string;
}
