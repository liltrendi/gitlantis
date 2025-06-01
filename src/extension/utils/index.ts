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

  if (!scriptUri || !styleUri) {
    vscode.window.showErrorMessage("Failed to load Gitlantis assets");
    return null;
  }

  return { scriptUri, styleUri };
};

export const getModels = (
  panel: vscode.WebviewPanel,
  context: vscode.ExtensionContext
) => {
  const boatUri = getUri(panel.webview, context.extensionUri, [
    "out",
    "models",
    "boat",
    "scene-transformed.glb",
  ]);

  const cabinetUri = getUri(panel.webview, context.extensionUri, [
    "out",
    "models",
    "cabinet",
    "cabinet.glb",
  ]);

  const waterUri = getUri(panel.webview, context.extensionUri, [
    "out",
    "models",
    "ocean",
    "waternormals.jpeg",
  ]);

  return { boatUri, cabinetUri, waterUri };
};

export const createPanel = (context: vscode.ExtensionContext) => {
  const panel = vscode.window.createWebviewPanel(
    "gitlantisWebView",
    "Gitlantis",
    vscode.ViewColumn.One,
    {
      enableScripts: true,
      localResourceRoots: [
        vscode.Uri.joinPath(context.extensionUri, "out"),
        vscode.Uri.joinPath(context.extensionUri, "out", "assets"),
        vscode.Uri.joinPath(context.extensionUri, "out", "models"),
        vscode.Uri.joinPath(context.extensionUri, "out", "music"),
      ],
    }
  );
  return panel;
};

export const getWebviewPage = ({
  scripts,
  models,
}: {
  scripts: {
    scriptUri: vscode.Uri;
    styleUri: vscode.Uri;
  };
  models: {
    boatUri: vscode.Uri;
    cabinetUri: vscode.Uri;
    waterUri: vscode.Uri;
  };
}) => {
  return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="${scripts.styleUri}" />
        <title>Gitlantis</title>
      </head>
      <body>
        <div id="root"></div>
        <script>
          window.__MODEL_URIS__ = {
            boat: "${models.boatUri}",
            cabinet: "${models.cabinetUri}",
            water: "${models.waterUri}"
          };
        </script>
        <script type="module" src="${scripts.scriptUri}"></script>
      </body>
      </html>
    `;
};
