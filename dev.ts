import { video } from "./mod.ts";

video.getAvailableCodecs().then((codecs) => {
  Deno.writeFileSync(
    "codecs.json",
    new TextEncoder().encode(JSON.stringify(codecs, null, 2))
  );
});
