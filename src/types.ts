export interface Stream {
  width?: number;
  height?: number;
  bitRate?: number;
  bitsPerRawSample?: string;
  bitsPerSample?: number;
  rFrameRate?: string;
  avgFrameRate?: string;
  numericAvgFrameRate?: number;
  codec?: string;
  codecLongName?: string;
  codecType?: string;
  timeBase?: string;
  codecTag?: string;
  codecTagString?: string;
  duration?: number;
  startTime?: number;
  numberOfFrames?: number;
  profile?: string | number;
}
export interface GeneralMetadata {
  filePath?: string;
  numberOfStreams?: number;
  formatName?: string;
  formatLongName?: string;
  duration?: number;
  size?: number;
  bitRate?: number;
  startTime?: number;
  tags?: Record<string, string | number>;
  encoder?: string;
  creationTime?: string;
}
export type VideoMetadata = GeneralMetadata & {
  streams: Stream[];
};

export type DefaultVideoMetadata = GeneralMetadata & Stream;
