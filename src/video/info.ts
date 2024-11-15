// @ts-types="npm:@types/fluent-ffmpeg@2.1.27"
import ffmpeg from "fluent-ffmpeg";
import type { DefaultVideoMetadata, VideoMetadata } from "../types/video.ts";
import { parseFrameRate, stringToNumber } from "../utils.ts";

/**
 * Turn `ffmpeg.ffprobe` into a promise
 * @param videoPath
 * @returns
 */
export function ffprobe(videoPath: string): Promise<ffmpeg.FfprobeData> {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(videoPath, (err, metadata) => {
      if (err) {
        reject(err);
      } else {
        resolve(metadata);
      }
    });
  });
}

/**
 * Run ffprobe on video file and return useful metadata
 * @param videoPath
 * @returns
 */
export function readVideoMetadata(
  videoPath: string,
  options?: { ffprobePath?: string }
): Promise<VideoMetadata> {
  if (options && options.ffprobePath) {
    ffmpeg.setFfprobePath(options.ffprobePath);
  }
  return ffprobe(videoPath).then((metadata) => {
    return {
      streams: metadata.streams.map((stream) => ({
        width: stream.width,
        height: stream.height,
        bitRate: stringToNumber(stream.bit_rate),
        profile: stream.profile,
        bitsPerRawSample: stream.bits_per_raw_sample,
        bitsPerSample: stream.bits_per_sample,
        rFrameRate: stream.r_frame_rate,
        avgFrameRate: stream.avg_frame_rate,
        numericAvgFrameRate: parseFrameRate(stream.avg_frame_rate ?? "0/1"),
        codec: stream.codec_name,
        codecLongName: stream.codec_long_name,
        codecType: stream.codec_type,
        timeBase: stream.time_base,
        codecTag: stream.codec_tag,
        codecTagString: stream.codec_tag_string,
        duration: stringToNumber(stream.duration),
        startTime: stream.start_time,
        numberOfFrames: stringToNumber(stream.nb_frames),
      })),
      filePath: videoPath,
      numberOfStreams: metadata.streams.length,
      formatName: metadata.format.format_name,
      formatLongName: metadata.format.format_long_name,
      duration: metadata.format.duration,
      size: metadata.format.size,
      bitRate: metadata.format.bit_rate,
      startTime: metadata.format.start_time,
      tags: metadata.format.tags,
      encoder: metadata.format.encoder ?? metadata.format.tags?.encoder,
      creationTime:
        metadata.format.creation_time ?? metadata.format.tags?.creation_time,
    };
  });
}

/**
 * Try to find the main stream from video file and return useful metadata as a flat object
 * @example
 * ```ts
 * import { video } from "./mod.ts";
 * const videoPath =
 * "/Volumes/EditDrive/2024-QC/DJI-mini-4/DJI_20241004162411_0110_D.MP4";
 * video.readMainVideoMetadata(videoPath).then(console.log);
 * ```
 * @param videoPath
 * @returns
 */
export function readMainVideoMetadata(
  videoPath: string
): Promise<DefaultVideoMetadata | null> {
  return readVideoMetadata(videoPath).then((metadata) => {
    const videoStreams = metadata.streams.filter(
      (s) => s.codecType === "video"
    );
    if (videoStreams.length === 0) {
      return null;
    }
    const mainVideoStream = videoStreams.sort((a, b) =>
      a.numericAvgFrameRate && b.numericAvgFrameRate
        ? b.numericAvgFrameRate - a.numericAvgFrameRate
        : 0
    )[0];
    const result = {
      ...metadata,
      ...mainVideoStream,
    };
    const { streams: _streams, tags: _tags, ...restMetadata } = result;
    return restMetadata;
  });
}

export function getAvailableEncoders(
  source?: string
): Promise<ffmpeg.Encoders> {
  const cmd = source ? ffmpeg(source) : ffmpeg();
  return new Promise((resolve, reject) => {
    return cmd.getAvailableEncoders((err, encoders) => {
      if (err) {
        reject(err);
      } else {
        resolve(encoders);
      }
    });
  });
}

export function getAvailableEncodersNames(source?: string): Promise<string[]> {
  return getAvailableEncoders(source).then((encoders) => Object.keys(encoders));
}

export function getAvailableCodecs(source?: string): Promise<ffmpeg.Codecs> {
  const cmd = source ? ffmpeg(source) : ffmpeg();
  return new Promise((resolve, reject) => {
    return cmd.getAvailableCodecs((err, codecs) => {
      if (err) {
        reject(err);
      } else {
        resolve(codecs);
      }
    });
  });
}

export function getAvailableCodecsByType(
  type: "video" | "audio" | "subtitle" | string,
  source?: string
): Promise<ffmpeg.Codecs> {
  return getAvailableCodecs(source)
    .then((codecs) =>
      Object.entries(codecs).filter(([_, codec]) => codec.type === type)
    )
    .then((codecsArr) => Object.fromEntries(codecsArr));
}

export function getAvailableCodecsNamesByType(
  type: "video" | "audio" | "subtitle" | string,
  source?: string
): Promise<string[]> {
  return getAvailableCodecs(source).then((codecs) =>
    Object.entries(codecs)
      .filter(([_, codec]) => codec.type === type)
      .map(([name]) => name)
  );
}

export function getAvailableFormats(source?: string): Promise<ffmpeg.Formats> {
  const cmd = source ? ffmpeg(source) : ffmpeg();
  return new Promise((resolve, reject) => {
    return cmd.getAvailableFormats((err, formats) => {
      if (err) {
        reject(err);
      } else {
        resolve(formats);
      }
    });
  });
}

export function getAvailableFormatsNames(source?: string): Promise<string[]> {
  return getAvailableFormats(source).then((formats) => Object.keys(formats));
}

export function getAvailableFilters(source?: string): Promise<ffmpeg.Filters> {
  const cmd = source ? ffmpeg(source) : ffmpeg();
  return new Promise((resolve, reject) => {
    return cmd.getAvailableFilters((err, filters) => {
      if (err) {
        reject(err);
      } else {
        resolve(filters);
      }
    });
  });
}

export function getAvailableFiltersNames(source?: string): Promise<string[]> {
  return getAvailableFilters(source).then((filters) => Object.keys(filters));
}
