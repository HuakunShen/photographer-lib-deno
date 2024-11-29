import { ExifDateTime } from "npm:exiftool-vendored@28.5.0";
import * as v from "valibot";

export const ImageGPSMetadata = v.object({
  latitude: v.optional(v.number()),
  latitudeRef: v.optional(v.string()),
  longitude: v.optional(v.number()),
  longitudeRef: v.optional(v.string()),
  altitude: v.optional(v.number()),
  altitudeRef: v.optional(v.string()),
  mapDatum: v.optional(v.string()),
});
export type ImageGPSMetadata = v.InferOutput<typeof ImageGPSMetadata>;

export const ImageMetadata = v.object({
  ...ImageGPSMetadata.entries,
  width: v.optional(v.number()),
  height: v.optional(v.number()),
  bitsPerSample: v.optional(v.number()),
  fileSize: v.optional(v.string()),
  make: v.optional(v.string()),
  model: v.optional(v.string()),
  DateTimeOriginal: v.optional(v.union([v.string(), v.instance(ExifDateTime)])),
  FileModifyDate: v.optional(v.union([v.string(), v.instance(ExifDateTime)])),
  ModifyDate: v.optional(v.union([v.string(), v.instance(ExifDateTime)])),
  CreateDate: v.optional(v.union([v.string(), v.instance(ExifDateTime)])),
  dateCreated: v.optional(v.union([v.string(), v.instance(ExifDateTime)])),
  dateModified: v.optional(v.union([v.string(), v.instance(ExifDateTime)])),
  FileFormat: v.optional(v.string()),
  Quality: v.optional(v.number()),
  RAWFileType: v.optional(v.string()),
  Compression: v.optional(v.string()),
  CameraOrientation: v.optional(v.string()),
  FacesDetected: v.optional(v.number()),
  focalLength: v.optional(v.string()),
  focalLength35efl: v.optional(v.string()),
  focalLengthIn35mmFormat: v.optional(v.string()),
  fNumber: v.optional(v.string()),
  exposureTime: v.optional(v.string()),
  exposureMode: v.optional(v.string()),
  exposureProgram: v.optional(v.string()),
});
export type ImageMetadata = v.InferOutput<typeof ImageMetadata>;
