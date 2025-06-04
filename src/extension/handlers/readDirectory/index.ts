import * as vscode from "vscode";
import { DIRECTORY_RESPONSE, DIRECTORY_ERRORS } from "../../config";
import type { TDirectoryContent, THandlerMessage } from "../../types";
import { getFolderUri, sendError } from "../utils";

export const handleReadDirectory = async (
  panel: vscode.WebviewPanel,
  message: THandlerMessage
) => {
  try {
    const folderUri = getFolderUri(message.path);
    const entries = await vscode.workspace.fs.readDirectory(folderUri);
    const children: TDirectoryContent[] = entries.map(([name, type]) => ({
      name,
      path: vscode.Uri.joinPath(folderUri, name),
      type: type === vscode.FileType.Directory ? "folder" : "file",
    }));

    panel.webview.postMessage({
      type: DIRECTORY_RESPONSE.children,
      path: message.path,
      children,
    });
  } catch (error: unknown) {
    sendError(
      panel,
      message.path,
      DIRECTORY_ERRORS.no_open_project,
      "You have no active project open at the moment."
    );
  }
};
