import { exiftool } from "exiftool-vendored";
import { assertEquals } from "jsr:@std/assert";
import { image } from "../mod.ts";
import * as v from "valibot";
import { ImageMetadata } from "../src/types/image.ts";

Deno.test("Read Image Metadata", async () => {
  const imagePath = "./data/DJI_20241002175651_0051_D.DNG";
});
