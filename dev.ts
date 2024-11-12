// @ts-types="npm:@types/fluent-ffmpeg@2.1.27"
import ffmpeg from "fluent-ffmpeg";
import { getAvailableEncoders } from "./src/video/info.ts";

// await ffmpeg("data/C0033.MP4")
ffmpeg("data/DJI_20241003141838_0089_D.MP4")
  //   .outputOptions(["-c:v h264_videotoolbox"])
  .setStartTime("00:00:05")
  .setDuration(5)
  .videoCodec("h264_videotoolbox")
  .on("error", function (err) {
    console.log("An error occurred: " + err.message);
  })
  .on("filenames", (filenames) => {
    console.log(filenames);
  })
  .on("progress", (progress) => {
    console.log(progress);
  })
  .save("output.mp4");

// ffmpeg.getAvailableEncoders(function (err, encoders) {
//   console.log("Available encoders:");
//   console.dir(encoders);
// });

// getAvailableEncoders().then((encoders) => {
//   console.log("Available encoders:");
//   console.dir(encoders);
// });
