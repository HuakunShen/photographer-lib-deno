import { image, video } from "./mod.ts";

const videoPath =
  "/Volumes/EditDrive/2024-QC/DJI-mini-4/DJI_20241004162411_0110_D.MP4";
video.readMainVideoMetadata(videoPath).then(console.log);
const imagePath = "/Users/hacker/Movies/Trip/DJI_20241006140443_0154_D.DNG";
image.readImageMetadata(imagePath).then(console.log);
