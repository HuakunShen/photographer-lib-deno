import { image, video } from "./mod.ts";

const imagePath = "/Users/hacker/Movies/Trip/DJI_20241006140443_0154_D.DNG";
video.readMainVideoMetadata(imagePath).then(console.log);
