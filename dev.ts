import sharp from "sharp";
import { image } from "./mod.ts";

const imagePath = "./output.png";

sharp(imagePath).metadata().then(console.log);
image.readImageMetadata(imagePath).then(console.log);
