import * as vscode from "vscode";
import { type TDirectoryContent, type THandlerMessage } from "../../types";
import {
  DIRECTORY_COMMANDS,
  DIRECTORY_ERRORS,
  DIRECTORY_RESPONSE,
  ROOT_DIRECTORY_KEY,
} from "../../config";

export const onDidReceiveMessage = async ({
  context,
  panel,
  message,
}: {
  context: vscode.ExtensionContext;
  panel: vscode.WebviewPanel;
  message: THandlerMessage;
}) => {
  if (message.type === DIRECTORY_COMMANDS.read) {
    let folderPath: string;

    try {
      if (message.path === ROOT_DIRECTORY_KEY) {
        const folders = vscode.workspace.workspaceFolders;
        if (!folders || folders.length === 0) {
          throw new Error();
        }
        folderPath = folders[0].uri.fsPath;
      } else {
        folderPath = message.path;
      }

      const folderUri = vscode.Uri.file(folderPath);
      const entries = await vscode.workspace.fs.readDirectory(folderUri);

      const items: TDirectoryContent[] = entries.map(([name, type]) => ({
        name,
        type: type === vscode.FileType.Directory ? "folder" : "file",
      }));

      panel.webview.postMessage({
        type: DIRECTORY_RESPONSE.children,
        path: message.path,
        children: items,
      });
    } catch (error: unknown) {
      panel.webview.postMessage({
        type: DIRECTORY_RESPONSE.error,
        path: message.path,
        error: {
          type: DIRECTORY_ERRORS.no_open_project,
          message: "You have no active project open at the moment.",
        },
      });
    }
  } else if (message.type === DIRECTORY_COMMANDS.open_file_explorer) {
    try {
      const selected = await vscode.window.showOpenDialog({
        canSelectFolders: true,
        canSelectMany: false,
        openLabel: "Open Folder",
      });

      if (!selected || selected.length === 0) {
        panel.webview.postMessage({
          type: DIRECTORY_RESPONSE.error,
          path: ROOT_DIRECTORY_KEY,
          error: {
            type: DIRECTORY_ERRORS.no_open_project,
            message: "You have no active project open at the moment.",
          },
        });
        return;
      }

      context.globalState.update("shouldReopenWebview", true);

      await vscode.commands.executeCommand(
        "vscode.openFolder",
        selected[0],
        false
      );
    } catch (err) {
      panel.webview.postMessage({
        type: DIRECTORY_RESPONSE.error,
        path: ROOT_DIRECTORY_KEY,
        error: {
          type: DIRECTORY_ERRORS.generic,
          message: (err as Error).message,
        },
      });
    }
  }
};
