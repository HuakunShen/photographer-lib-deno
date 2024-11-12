// @ts-types="npm:@types/fluent-ffmpeg@2.1.27"
import ffmpeg from "fluent-ffmpeg";
import type { Progress } from "../types/video.ts";

export type ProcessVideoOptions = {
  resizePercentage?: number;
  size?: string;
  aspectRatio?: string;
  videoCodec?: string;
  audioCodec?: string;
  format?: string;
  outputOptions?: string[];
  audioFilters?: string[];
  noAudio?: boolean;
  takeFrames?: number;
  noVideo?: boolean;
  autopad?: {
    pad?: boolean;
    color?: string;
  };
  audioQuality?: number;
  fps?: number;
  preset?:
    | "ultrafast"
    | "superfast"
    | "veryfast"
    | "faster"
    | "fast"
    | "medium"
    | "slow"
    | "slower"
    | "veryslow";
  startTime?: string | number;
  duration?: string | number;
  audioBitrate?: number;
  videoBitrate?: number;
  audioChannels?: number;
};

export function convertVideo(
  inputPath: string,
  outputPath: string,
  options: ProcessVideoOptions,
  startCallback?: () => void,
  progressCallback?: (progress: Progress) => void,
  endCallback?: () => void
): void {
  let cmd = ffmpeg(inputPath);
  if (options.size) {
    cmd = cmd.size(options.size);
  }
  if (options.resizePercentage) {
    if (options.resizePercentage < 1) {
      throw new Error(
        "Resize percentage must be greater than 1, e.g. use 50% instead of 0.5"
      );
    }
    cmd = cmd.size(`${options.resizePercentage}%`);
  }

  if (options.autopad) {
    cmd = cmd.autopad(options.autopad.pad, options.autopad.color);
  }

  if (options.format) {
    cmd = cmd.withOutputFormat(options.format);
  }

  if (options.aspectRatio) {
    cmd = cmd.aspect(options.aspectRatio);
  }

  if (options.videoCodec) {
    cmd = cmd.videoCodec(options.videoCodec);
  }

  if (options.audioCodec) {
    cmd = cmd.audioCodec(options.audioCodec);
  }

  if (options.noAudio) {
    cmd = cmd.noAudio();
  }

  if (options.audioChannels) {
    cmd = cmd.audioChannels(options.audioChannels);
  }

  if (options.preset) {
    cmd = cmd.preset(options.preset);
  }

  if (options.audioBitrate) {
    cmd = cmd.audioBitrate(options.audioBitrate);
  }

  if (options.videoBitrate) {
    cmd = cmd.videoBitrate(options.videoBitrate);
  }

  if (options.startTime) {
    cmd = cmd.setStartTime(options.startTime);
  }

  if (options.duration) {
    cmd = cmd.setDuration(options.duration);
  }

  if (options.outputOptions) {
    cmd = cmd.outputOptions(options.outputOptions);
  }

  if (options.audioQuality) {
    cmd = cmd.audioQuality(options.audioQuality);
  }

  if (options.audioFilters) {
    cmd = cmd.audioFilters(options.audioFilters);
  }

  if (options.noVideo) {
    cmd = cmd.noVideo();
  }

  if (options.fps) {
    cmd = cmd.fps(options.fps);
  }

  if (options.takeFrames) {
    cmd = cmd.takeFrames(options.takeFrames);
  }

  if (startCallback) {
    cmd = cmd.on("start", startCallback);
  }
  if (progressCallback) {
    cmd = cmd.on("progress", progressCallback);
  }
  if (endCallback) {
    cmd = cmd.on("end", endCallback);
  }
  cmd.save(outputPath);
}
