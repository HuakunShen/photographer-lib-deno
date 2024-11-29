import { exiftool, type Tags, ExifTool, ExifDateTime } from "exiftool-vendored";
import { image } from "./mod.ts";

// await image.batchSmartSetImageOriginalDate(
//   [
//     "/Users/hk/Desktop/edit-image-time/_DSC2420.ARW",
//     "/Users/hk/Desktop/edit-image-time/_DSC2422.ARW",
//     "/Users/hk/Desktop/edit-image-time/_DSC2423.ARW",
//     "/Users/hk/Desktop/edit-image-time/_DSC2424.ARW",
//     "/Users/hk/Desktop/edit-image-time/_DSC2425.ARW",
//     "/Users/hk/Desktop/edit-image-time/_DSC2427.ARW",
//     "/Users/hk/Desktop/edit-image-time/_DSC2428.ARW",
//   ],
//   "/Users/hk/Desktop/edit-image-time/_DSC2424.ARW",
//   ExifDateTime.from(new Date(2024, 10, 1, 15, 0, 0, 0).toISOString())
// );

const metadata = await image.batchReadImageMetadata([
  "/Users/hk/Pictures/2024-Vancouver/11-27/_DSC2409.ARW",
  "/Users/hk/Pictures/2024-Vancouver/11-27/_DSC2410.ARW",
  "/Users/hk/Pictures/2024-Vancouver/11-27/_DSC2411.ARW",
  "/Users/hk/Pictures/2024-Vancouver/11-27/_DSC2412.ARW",
]);

console.log(metadata);
