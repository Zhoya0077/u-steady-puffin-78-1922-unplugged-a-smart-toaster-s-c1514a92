// Unplugged: A Smart Toaster's Breakup Line — make.fun entry.
// Writes the toaster's one-line breakup text to <output dir>/entry.txt.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "It's not you, it's the firmware update. I need someone who doesn't unplug me mid-toast and call it a lifestyle choice.";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const entryPath = join(outputDir, "entry.txt");

// The gate allows 1 to 280 characters; refuse to write an entry
// the judge would never see.
if (ENTRY.length < 1 || ENTRY.length > 280) {
  throw new Error(`entry is ${ENTRY.length} characters, must be 1-280`);
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(entryPath, ENTRY, "utf8");

// Self-checking gate: read the file back and confirm it matches the
// entry byte for byte before reporting success. A mismatch fails loudly
// instead of shipping a broken artifact to the judge.
const written = readFileSync(entryPath, "utf8");
if (written !== ENTRY) {
  throw new Error("self-check failed: entry.txt does not match the entry text");
}
if (written.length < 1 || written.length > 280) {
  throw new Error(
    `self-check failed: entry.txt is ${written.length} characters, must be 1-280`,
  );
}
console.log("self-check passed: entry.txt matches the entry byte for byte");
console.log(ENTRY);
console.log(`wrote ${ENTRY.length} characters to ${entryPath}`);
