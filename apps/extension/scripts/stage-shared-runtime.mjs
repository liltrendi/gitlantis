import {
  cp,
  mkdir,
  readdir,
  readFile,
  rm,
  stat,
  writeFile,
} from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const extensionRoot = path.resolve(__dirname, "..");
const sharedRoot = path.resolve(extensionRoot, "../../packages/shared");
const runtimeRoot = path.resolve(
  extensionRoot,
  "out/node_modules/@gitlantis/shared"
);
const extensionOutRoot = path.resolve(extensionRoot, "out");

const sharedSourcePathRegex =
  /(["'])(?:\.\.\/)+node_modules\/@gitlantis\/shared\/dist\/(config|models|settings)(?:\.js)?\1/g;

const rewriteSharedImports = async (rootDir) => {
  const entries = await readdir(rootDir, { withFileTypes: true });

  for (const entry of entries) {
    const filePath = path.join(rootDir, entry.name);

    if (entry.isDirectory()) {
      await rewriteSharedImports(filePath);
      continue;
    }

    if (!entry.isFile() || !filePath.endsWith(".js")) {
      continue;
    }

    const fileStat = await stat(filePath);
    if (fileStat.size === 0) {
      continue;
    }

    const content = await readFile(filePath, "utf8");
    const updated = content.replace(
      sharedSourcePathRegex,
      (_match, quote, moduleName) =>
        `${quote}@gitlantis/shared/${moduleName}${quote}`
    );

    if (updated !== content) {
      await writeFile(filePath, updated, "utf8");
    }
  }
};

await rewriteSharedImports(extensionOutRoot);

await rm(runtimeRoot, { recursive: true, force: true });
await mkdir(path.dirname(runtimeRoot), { recursive: true });
await mkdir(runtimeRoot, { recursive: true });
await cp(
  path.join(sharedRoot, "package.json"),
  path.join(runtimeRoot, "package.json")
);
await cp(path.join(sharedRoot, "dist"), path.join(runtimeRoot, "dist"), {
  recursive: true,
});
