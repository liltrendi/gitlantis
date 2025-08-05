import * as vscode from "vscode";
import { DIRECTORY_RESPONSE, DIRECTORY_ERRORS } from "../../config";
import type { TDirectoryContent, THandlerMessage } from "../../types";
import { getWorkspaceFolderFromPath, sendError } from "../utils";

export const handleReadDirectory = async (
  panel: vscode.WebviewPanel,
  message: THandlerMessage
) => {
  try {
    const {
      name: folderLabel,
      uri: folderUri,
      baseFolder,
    } = getWorkspaceFolderFromPath(message.path);
    const entries = await vscode.workspace.fs.readDirectory(folderUri);

    const children: TDirectoryContent[] = entries.map(([name, type]) => ({
      name,
      path: vscode.Uri.joinPath(folderUri, name),
      type:
        type & vscode.FileType.Directory
          ? "folder"
          : type & vscode.FileType.File
            ? "file"
            : "unknown",
      isSymlink: Boolean(type & vscode.FileType.SymbolicLink),
    }));
    console.log(":::entries:::", children);

    panel.webview.postMessage({
      label: folderLabel,
      type: DIRECTORY_RESPONSE.data,
      path: message.path,
      children,
      baseFolder,
    });
  } catch (error: unknown) {
    sendError(
      panel,
      message.path,
      DIRECTORY_ERRORS.no_open_project,
      (error as Error).message.toLowerCase().includes("no") &&
        (error as Error).message.toLowerCase().includes("found")
        ? "You have no active project open at the moment."
        : "There was a problem loading your project"
    );
  }
};
