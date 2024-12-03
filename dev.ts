import { exiftool, type Tags, ExifTool, ExifDateTime } from "exiftool-vendored";
import { image } from "./mod.ts";
// image.batchSetImageGPS(
//   [
//     "/Users/hk/Desktop/_DSC2594.ARW",
//     "/Users/hk/Desktop/_DSC2597.ARW",
//     "/Users/hk/Desktop/_DSC2598.ARW",
//     "/Users/hk/Desktop/DJI_20241128180028_0198_D.JPG",
//   ],
//   {
//     latitude: 49.2827,
//     longitude: -123.1207,
//   }
// );
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

// const metadata = await image.batchReadImageMetadata([
//   "/Users/hk/Desktop/_DSC0050.NEF",
// ]);

// console.log(metadata);
exiftool.read("/Users/hk/Desktop/_DSC0050.NEF").then(console.log);
// console.log(
//   await image.readImageMetadata(
//     "/Users/hk/Pictures/2024-Vancouver/11-27/_DSC2412.ARW"
//   )
// );

// exiftool.write("/Users/hk/Desktop/DJI_20241128180028_0198_D.JPG", {
//   GPSLatitude: 1,
//   GPSLongitude: 1,
// });
// exiftool
//   .read("/Users/hk/Desktop/DJI_20241128180028_0198_D.JPG")
//   .then(console.log);
