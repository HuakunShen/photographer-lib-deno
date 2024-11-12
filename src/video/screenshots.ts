// @ts-types="npm:@types/fluent-ffmpeg@2.1.27"
import ffmpeg from "fluent-ffmpeg";

export function takeScreenshots(
  inputPath: string,
  options: {
    count?: number;
    timestamps?: number[];
    filename?: string;
    size?: string;
    folder: string;
  }
) {
  return ffmpeg(inputPath).takeScreenshots(options);
}
