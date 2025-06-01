import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function getHashedAssetUri(
  webview: vscode.Webview,
  extensionUri: vscode.Uri,
  assetFolder: string,
  filenamePrefix: string,
  extension: string
): vscode.Uri | undefined {
  const dirPath = path.join(vscode.Uri.joinPath(extensionUri, assetFolder).fsPath, 'assets');
  const files = fs.readdirSync(dirPath);
  const targetFile = files.find(file => file.startsWith(filenamePrefix) && file.endsWith(extension));
  if (!targetFile) return undefined;

  return webview.asWebviewUri(
    vscode.Uri.joinPath(extensionUri, assetFolder, 'assets', targetFile)
  );
}

export function getWebviewUri(webview: vscode.Webview, extensionUri: vscode.Uri, relativePath: string) {
  const diskPath = vscode.Uri.joinPath(extensionUri, "out", relativePath);
  return webview.asWebviewUri(diskPath);
}

export function getUri(webview: vscode.Webview, extensionUri: vscode.Uri, pathList: string[]) {
  return webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, ...pathList));
}

