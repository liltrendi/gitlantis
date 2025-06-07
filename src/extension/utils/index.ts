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

export const getModels = (
  panel: vscode.WebviewPanel,
  context: vscode.ExtensionContext
) => {
  const oceanUri = getUri(panel.webview, context.extensionUri, [
    "out",
    "models",
    "ocean",
    "ocean.jpeg",
  ]);

  const boatUri = getUri(panel.webview, context.extensionUri, [
    "out",
    "models",
    "boat",
    "boat.glb",
  ]);

  const folderUri = getUri(panel.webview, context.extensionUri, [
    "out",
    "models",
    "folder",
    "folder.glb",
  ]);

  const fileUri = getUri(panel.webview, context.extensionUri, [
    "out",
    "models",
    "file",
    "file.glb",
  ]);

  const audioUri = getUri(panel.webview, context.extensionUri, [
    "out",
    "music",
    "waves.mp3",
  ]);

  return { oceanUri, boatUri, folderUri, fileUri, audioUri };
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
    workspaceFoldersUri: string;
  };
  models: {
    oceanUri: vscode.Uri;
    boatUri: vscode.Uri;
    folderUri: vscode.Uri;
    fileUri: vscode.Uri;
    audioUri: vscode.Uri;
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
            ocean: "${models.oceanUri}",
            boat: "${models.boatUri}",
            folder: "${models.folderUri}",
            file: "${models.fileUri}",
            audio: "${models.audioUri}",
          };
          window.__GITLANTIS_ROOT__ = "${scripts.workspaceFoldersUri}";
        </script>
        <script type="module" src="${scripts.scriptUri}"></script>
      </body>
      </html>
    `;
};

let vscodeWeb: TAcquireVsCode | undefined;

export function getVSCodeAPI() {
  if (typeof acquireVsCodeApi !== "undefined") {
    if (!vscodeWeb) {
      vscodeWeb = acquireVsCodeApi();
    }
    return vscodeWeb;
  } else {
    console.warn("acquireVsCodeApi is not available in this context.");
    return {
      postMessage: (_: any) => {
        console.warn("postMessage called outside VSCode webview");
      },
    };
  }
}
