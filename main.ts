import exiftool from "exiftool-vendored";
import { image, video } from "./mod.ts";
import sharp from "sharp";

// const videoPath = "./data/DJI_20241003141838_0089_D.MP4";
// video.readMainVideoMetadata(videoPath).then(console.log);
// const imagePath = "/Users/hacker/Movies/Trip/DJI_20241006140443_0154_D.DNG";
// image.readImageMetadata(imagePath).then(console.log);

// const imagePath = "./data/DJI_20241002175651_0051_D.DNG";
// const metadata = await image.readImageMetadata(imagePath);
// console.log(metadata);
// await video.toFormat("./data/C0033.MP4", "mov").save("./output.mov");
// console.log("done");

await video.resizeByPercentage("./data/C0033.MP4", "./output.mp4", 50);
console.log("done");
