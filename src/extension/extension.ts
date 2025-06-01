import * as vscode from "vscode";
import { getHashedAssetUri, getUri } from './getUri';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("gitlantis.openWebview", () => {
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

      const scriptUri = getHashedAssetUri(panel.webview, context.extensionUri, 'out', 'index', '.js');
      const styleUri = getHashedAssetUri(panel.webview, context.extensionUri, 'out', 'index', '.css');

      if (!scriptUri || !styleUri) {
        vscode.window.showErrorMessage('Failed to load Gitlantis assets');
        return;
      }

      const boatModelUri = getUri(panel.webview, context.extensionUri, [
        "out",
        "models",
        "boat",
        "scene-transformed.glb",
      ]);
      
      const cabinetModelUri = getUri(panel.webview, context.extensionUri, [
        "out",
        "models",
        "cabinet",
        "cabinet.glb",
      ]);
      
      const waterTextureUri = getUri(panel.webview, context.extensionUri, [
        "out",
        "models",
        "ocean",
        "waternormals.jpeg",
      ]);

      panel.webview.html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="stylesheet" href="${styleUri}" />
          <title>Gitlantis</title>
        </head>
        <body>
          <div id="root"></div>
          <script>
            window.__MODEL_URIS__ = {
              boat: "${boatModelUri}",
              cabinet: "${cabinetModelUri}",
              water: "${waterTextureUri}"
            };
          </script>
          <script type="module" src="${scriptUri}"></script>
        </body>
        </html>
      `;
    })
  );
}
