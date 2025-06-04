import * as vscode from "vscode";
import * as path from "path";
import { DIRECTORY_RESPONSE, ROOT_DIRECTORY_KEY } from "../../config";

export const getWorkspaceFolderFromPath = (
  inputPath: string | null | undefined
): vscode.WorkspaceFolder => {
  if (!inputPath || inputPath === ROOT_DIRECTORY_KEY) {
    const folders = vscode.workspace.workspaceFolders;
    if (!folders || folders.length === 0) {
      throw new Error("No workspace folder found.");
    }
    return folders[0];
  }

  const folderUri = vscode.Uri.file(inputPath);

  return {
    name: path.basename(folderUri.path),
    uri: folderUri,
    index: 0,
  };
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
