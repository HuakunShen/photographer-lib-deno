// @ts-types="npm:@types/fluent-ffmpeg@2.1.27"
import ffmpeg from "fluent-ffmpeg";
import type { Progress } from "../types/video.ts";

export function convertVideo(
  inputPath: string,
  outputPath: string,
  format: string,
  progressCallback?: (progress: Progress) => void,
  endCallback?: () => void
) {
  let cmd = ffmpeg(inputPath).toFormat(format);
  if (progressCallback) {
    cmd = cmd.on("progress", progressCallback);
  }
  if (endCallback) {
    cmd = cmd.on("end", endCallback);
  }
  return cmd.save(outputPath);
}

export function toFormat(
  inputPath: string,
  outputPath: string,
  format: string,
  progressCallback?: (progress: Progress) => void,
  endCallback?: () => void
) {
  let cmd = ffmpeg(inputPath).toFormat(format);
  if (progressCallback) {
    cmd = cmd.on("progress", progressCallback);
  }
  if (endCallback) {
    cmd = cmd.on("end", endCallback);
  }
  return cmd.save(outputPath);
}

/**
 * Resize video by percentage while keeping the aspect ratio
 * @param videoPath
 * @param percentage don't use decimal. Use 50% instead of 0.5
 * @returns
 */
export function resizeByPercentage(
  inputPath: string,
  outputPath: string,
  percentage: number,
  progressCallback?: (progress: Progress) => void,
  endCallback?: () => void
) {
  let cmd = ffmpeg(inputPath);
  if (progressCallback) {
    cmd = cmd.on("progress", progressCallback);
  }
  if (endCallback) {
    cmd = cmd.on("end", endCallback);
  }
  return cmd.size(`${percentage}%`).save(outputPath);
}
