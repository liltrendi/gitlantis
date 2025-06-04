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
  switch (message.type) {
    case DIRECTORY_COMMANDS.read_directory:
      return handleReadDirectory(panel, message);
    case DIRECTORY_COMMANDS.open_file:
      return handleOpenFile(message.path);
    case DIRECTORY_COMMANDS.open_file_explorer:
      return handleOpenFileExplorer(context, panel);
  }
};

const getFolderPath = (path: string | null | undefined): vscode.Uri => {
  if (!path || path === ROOT_DIRECTORY_KEY) {
    const folders = vscode.workspace.workspaceFolders;
    if (!folders || folders.length === 0) {
      throw new Error("No workspace folder found.");
    }
    return folders[0].uri;
  }

  return vscode.Uri.file(path);
};


const handleReadDirectory = async (
  panel: vscode.WebviewPanel,
  message: THandlerMessage
) => {
  try {
    const folderPath = getFolderPath(message.path);
    const children = await readDirectory(folderPath);

    panel.webview.postMessage({
      type: DIRECTORY_RESPONSE.children,
      path: message.path,
      children
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

const handleOpenFileExplorer = async (
  context: vscode.ExtensionContext,
  panel: vscode.WebviewPanel
) => {
  try {
    const selected = await vscode.window.showOpenDialog({
      canSelectFolders: true,
      canSelectMany: false,
      openLabel: "Open Folder",
    });

    if (!selected || selected.length === 0) {
      return sendError(
        panel,
        ROOT_DIRECTORY_KEY,
        DIRECTORY_ERRORS.no_open_project,
        "You have no active project open at the moment."
      );
    }

    await context.globalState.update("gitlantisActive", true);
    await vscode.commands.executeCommand(
      "vscode.openFolder",
      selected[0],
      false
    );
  } catch (err) {
    sendError(
      panel,
      ROOT_DIRECTORY_KEY,
      DIRECTORY_ERRORS.generic,
      (err as Error).message
    );
  }
};

const handleOpenFile = async (filePath: string) => {
  const uri = vscode.Uri.file(filePath);
  await vscode.window.showTextDocument(uri);
};

const readDirectory = async (
  folderUri: vscode.Uri
): Promise<TDirectoryContent[]> => {
  const entries = await vscode.workspace.fs.readDirectory(folderUri);

  const items: TDirectoryContent[] = entries.map(([name, type]) => ({
    name,
    path: vscode.Uri.joinPath(folderUri, name),
    type: type === vscode.FileType.Directory ? "folder" : "file",
  }));

  return items;
};

const sendError = (
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
