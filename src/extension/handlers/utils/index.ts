import * as vscode from "vscode";
import * as path from 'path';
import * as fs from 'fs';
import { DIRECTORY_RESPONSE, ROOT_DIRECTORY_KEY } from "../../config";

export const getFolderUri = (path: string | null | undefined): vscode.Uri => {
  if (!path || path === ROOT_DIRECTORY_KEY) {
    const folders = vscode.workspace.workspaceFolders;
    if (!folders || folders.length === 0) {
      throw new Error("No workspace folder found.");
    }
    return folders[0].uri;
  }

  return vscode.Uri.file(path);
};

export const getWorkspaceFolderFromPath = (inputPath: string | null | undefined): vscode.WorkspaceFolder => {
  const folders = vscode.workspace.workspaceFolders;

  if (!folders || folders.length === 0) {
    throw new Error("No workspace folder found.");
  }

  if (!inputPath || inputPath === ROOT_DIRECTORY_KEY) {
    return folders[0];
  }

  const folderPath = fs.existsSync(inputPath) && fs.lstatSync(inputPath).isDirectory()
    ? inputPath
    : path.dirname(inputPath);

  const folderUri = vscode.Uri.file(folderPath);

  const folder = folders.find(folder => folder.uri.fsPath === folderUri.fsPath || folderUri.fsPath.startsWith(folder.uri.fsPath));
  if (!folder) {
    throw new Error(`No matching workspace folder found for path: ${inputPath}`);
  }

  return folder;
};

export const sendError = (
  panel: vscode.WebviewPanel,
  path: string,
  errorType: string,
  message: string
) => {
  panel.webview.postMessage({
    type: DIRECTORY_RESPONSE.error,
    path,
    error: { type: errorType, message },
  });
};
