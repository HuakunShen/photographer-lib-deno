// import { batchReadImageMetadata, readImageTags } from "./src/image/info.ts";
import { image } from "./mod.ts";

const files = [
  // "/Users/hacker/Dev/projects/photographer-lib-deno/data/DSC03635.JPG",
  // "/Users/hacker/Dev/projects/photographer-lib-deno/data/IMG_3181.HEIC",
  // "/Users/hacker/Dev/projects/photographer-lib-deno/data/DJI_20241002175820_0054_D.JPG",
  // "/Users/hacker/Dev/projects/photographer-lib-deno/data/DJI_20241002175651_0051_D.DNG",
  "/Users/hacker/Dev/projects/photographer-lib-deno/mod.ts",
  "/Users/hacker/Dev/projects/photographer-lib-deno/data/DSC03635.ARW",
];
image.batchReadImageMetadata(files).then(console.log);
// for (const p of files) {
//   const tags = await readImageTags(p);
//   console.log(p, tags);
// }
