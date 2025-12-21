import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

export const getHashedAssetUri = (
  webview: vscode.Webview,
  extensionUri: vscode.Uri,
  assetFolder: string,
  filenamePrefix: string,
  extension: string
): vscode.Uri | undefined => {
  const dirPath = path.join(
    vscode.Uri.joinPath(extensionUri, assetFolder).fsPath,
    "assets"
  );
  const files = fs.readdirSync(dirPath);
  const targetFile = files.find(
    (file) => file.startsWith(filenamePrefix) && file.endsWith(extension)
  );
  if (!targetFile) return undefined;

  return webview.asWebviewUri(
    vscode.Uri.joinPath(extensionUri, assetFolder, "assets", targetFile)
  );
};

export const getUri = (
  webview: vscode.Webview,
  extensionUri: vscode.Uri,
  pathList: string[]
) => {
  return webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, ...pathList));
};

export const getTranspiledScripts = (
  panel: vscode.WebviewPanel,
  context: vscode.ExtensionContext
) => {
  const scriptUri = getHashedAssetUri(
    panel.webview,
    context.extensionUri,
    "out",
    "index",
    ".js"
  );
  const styleUri = getHashedAssetUri(
    panel.webview,
    context.extensionUri,
    "out",
    "index",
    ".css"
  );
  const workspaceFoldersUri =
    vscode.workspace.workspaceFolders?.[0]?.uri.toString() ?? "";

  if (!scriptUri || !styleUri) {
    vscode.window.showErrorMessage("gitlantis::failed to load scripts");
    return null;
  }

  return { scriptUri, styleUri, workspaceFoldersUri };
};

export const getPublicAssets = (
  panel: vscode.WebviewPanel,
  context: vscode.ExtensionContext
) => {
  const assetUris = {
    ocean: "out/models/ocean/ocean.jpeg",
    boat: "out/models/boat/boat.glb",
    folder: "out/models/folder/folder.glb",
    file: "out/models/file/file.glb",
    waves: "out/music/waves.mp3",
    favicon: "out/images/favicon.png",
    horn: "out/music/horn.ogg",
    noiseTexture: "out/images/textures/noise_texture.jpg",
    bladeDiffuse: "out/images/textures/blade_diffuse.jpg",
    bladeAlpha: "out/images/textures/blade_alpha.jpg",
    player: "out/models/bot/bot.glb",
  };

  const assetUrisWithUri = Object.entries(assetUris).reduce(
    (acc, [key, url]) => {
      return {
        ...acc,
        [`${key}Uri`]: getUri(
          panel.webview,
          context.extensionUri,
          url.split("/")
        ),
      };
    },
    {} as {
      [K in keyof typeof assetUris as `${string & K}Uri`]: vscode.Uri;
    }
  );

  return assetUrisWithUri;
};

export const createPanel = (context: vscode.ExtensionContext) => {
  const panel = vscode.window.createWebviewPanel(
    "gitlantisWebView",
    "Gitlantis",
    vscode.ViewColumn.One,
    {
      enableScripts: true,
      retainContextWhenHidden: true,
      localResourceRoots: [
        vscode.Uri.joinPath(context.extensionUri, "out"),
        vscode.Uri.joinPath(context.extensionUri, "out", "assets"),
        vscode.Uri.joinPath(context.extensionUri, "out", "models"),
        vscode.Uri.joinPath(context.extensionUri, "out", "music"),
        vscode.Uri.joinPath(context.extensionUri, "out", "images"),
      ],
    }
  );
  const faviconPath = vscode.Uri.joinPath(
    context.extensionUri,
    "out",
    "images",
    "favicon.png"
  );
  panel.iconPath = {
    light: faviconPath,
    dark: faviconPath,
  };
  return panel;
};

export const getWebviewPage = ({
  scripts,
  publicAssets,
}: {
  scripts: ReturnType<typeof getTranspiledScripts>;
  publicAssets: ReturnType<typeof getPublicAssets>;
}) => {
  return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/png" href="${publicAssets.faviconUri}" />
        <link rel="stylesheet" href="${scripts?.styleUri}" />
        <title>Gitlantis</title>
      </head>
      <body>
        <div id="root"></div>
        <script>
          window.__GLOBAL_URIS__ = {
            ocean: "${publicAssets.oceanUri}",
            boat: "${publicAssets.boatUri}",
            folder: "${publicAssets.folderUri}",
            file: "${publicAssets.fileUri}",
            waves: "${publicAssets.wavesUri}",
            favicon: "${publicAssets.faviconUri}",
            horn: "${publicAssets.hornUri}",
            noiseTexture: "${publicAssets.noiseTextureUri}",
            bladeDiffuse: "${publicAssets.bladeDiffuseUri}",
            bladeAlpha: "${publicAssets.bladeAlphaUri}",
            player: "${publicAssets.playerUri}"
          };
          window.__GITLANTIS_ROOT__ = "${scripts?.workspaceFoldersUri}";
        </script>
        <script type="module" src="${scripts?.scriptUri}"></script>
      </body>
      </html>
    `;
};
