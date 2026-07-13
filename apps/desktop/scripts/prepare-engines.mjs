import { chmodSync, copyFileSync, existsSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const ffmpegPath = require("ffmpeg-static");

if (!ffmpegPath || !existsSync(ffmpegPath)) {
  throw new Error("ffmpeg-static did not provide a binary for this platform");
}

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const destinationDirectory = join(scriptDirectory, "..", "src-tauri", "resources", "engines");
const executableName = process.platform === "win32" ? "ffmpeg.exe" : "ffmpeg";
const destination = join(destinationDirectory, executableName);

mkdirSync(destinationDirectory, { recursive: true });
copyFileSync(ffmpegPath, destination);

for (const suffix of [".LICENSE", ".README"]) {
  const source = `${ffmpegPath}${suffix}`;
  if (existsSync(source)) {
    copyFileSync(source, `${destination}${suffix}`);
  }
}

if (process.platform !== "win32") {
  chmodSync(destination, 0o755);
}

console.log(`Prepared ${destination}`);
