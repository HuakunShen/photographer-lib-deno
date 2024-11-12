import { assertEquals } from "jsr:@std/assert";
import { video } from "../mod.ts";
import * as v from "valibot";
import { DefaultVideoMetadata } from "../src/types/video.ts";

Deno.test("Read Main Video Metadata", async () => {
  const videoPath = "./data/DJI_20241003141838_0089_D.MP4";
  const metadata = await video.readMainVideoMetadata(videoPath);
  assertEquals(v.parse(DefaultVideoMetadata, metadata), metadata);
});
