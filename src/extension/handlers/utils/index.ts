import * as vscode from "vscode";
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
