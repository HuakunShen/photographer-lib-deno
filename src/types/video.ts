// @ts-types="npm:@types/fluent-ffmpeg@2.1.27"
import type ffmpeg from "fluent-ffmpeg";
import * as v from "valibot";

export type Codec = ffmpeg.Codec;
export type Filters = ffmpeg.Filters;
export type Formats = ffmpeg.Formats;
export type Encoders = ffmpeg.Encoders;

export const Stream = v.object({
  width: v.optional(v.number()),
  height: v.optional(v.number()),
  bitRate: v.optional(v.number()),
  bitsPerRawSample: v.optional(v.string()),
  bitsPerSample: v.optional(v.number()),
  rFrameRate: v.optional(v.string()),
  avgFrameRate: v.optional(v.string()),
  numericAvgFrameRate: v.optional(v.number()),
  codec: v.optional(v.string()),
  codecLongName: v.optional(v.string()),
  codecType: v.optional(v.string()),
  timeBase: v.optional(v.string()),
  codecTag: v.optional(v.string()),
  codecTagString: v.optional(v.string()),
  duration: v.optional(v.number()),
  startTime: v.optional(v.number()),
  numberOfFrames: v.optional(v.number()),
  profile: v.optional(v.union([v.string(), v.number()])),
});

export const GeneralMetadata = v.object({
  filePath: v.optional(v.string()),
  numberOfStreams: v.optional(v.number()),
  formatName: v.optional(v.string()),
  formatLongName: v.optional(v.string()),
  duration: v.optional(v.number()),
  size: v.optional(v.number()),
  bitRate: v.optional(v.number()),
  startTime: v.optional(v.number()),
  tags: v.optional(v.record(v.string(), v.union([v.string(), v.number()]))),
  encoder: v.optional(v.string()),
  creationTime: v.optional(v.string()),
});

export type Stream = v.InferOutput<typeof Stream>;
export type GeneralMetadata = v.InferOutput<typeof GeneralMetadata>;
export const VideoMetadata = v.object({
  ...GeneralMetadata.entries,
  streams: v.array(Stream),
});
export type VideoMetadata = v.InferOutput<typeof VideoMetadata>;
export const DefaultVideoMetadata = v.object({
  ...GeneralMetadata.entries,
  ...Stream.entries,
});
export type DefaultVideoMetadata = v.InferOutput<typeof DefaultVideoMetadata>;

export const Progress = v.object({
  frames: v.number(),
  currentFps: v.number(),
  currentKbps: v.number(),
  targetSize: v.number(),
  timemark: v.string(),
  percent: v.optional(v.number()),
});
export type Progress = v.InferOutput<typeof Progress>;

export const ProcessVideoOptions = v.object({
  resizePercentage: v.optional(v.number()),
  size: v.optional(v.string()),
  aspectRatio: v.optional(v.string()),
  videoCodec: v.optional(v.string()),
  audioCodec: v.optional(v.string()),
  format: v.optional(v.string()),
  outputOptions: v.optional(v.array(v.string())),
  audioFilters: v.optional(v.array(v.string())),
  noAudio: v.optional(v.boolean()),
  takeFrames: v.optional(v.number()),
  noVideo: v.optional(v.boolean()),
  autopad: v.optional(
    v.object({
      pad: v.optional(v.boolean()),
      color: v.optional(v.string()),
    })
  ),
  audioQuality: v.optional(v.number()),
  fps: v.optional(v.number()),
  preset: v.optional(
    v.union([
      v.literal("ultrafast"),
      v.literal("superfast"),
      v.literal("veryfast"),
      v.literal("faster"),
      v.literal("fast"),
      v.literal("medium"),
      v.literal("slow"),
      v.literal("slower"),
      v.literal("veryslow"),
    ])
  ),
  startTime: v.optional(v.union([v.string(), v.number()])),
  duration: v.optional(v.union([v.string(), v.number()])),
  audioBitrate: v.optional(v.number()),
  videoBitrate: v.optional(v.number()),
  audioChannels: v.optional(v.number()),
  ffprobePath: v.optional(v.string()),
  ffmpegPath: v.optional(v.string()),
});
export type ProcessVideoOptions = v.InferOutput<typeof ProcessVideoOptions>;
