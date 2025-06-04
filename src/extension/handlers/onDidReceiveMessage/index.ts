import * as vscode from "vscode";
import { type THandlerMessage } from "../../types";
import { DIRECTORY_COMMANDS } from "../../config";
import { handleReadDirectory } from "../readDirectory";
import { handleOpenFile } from "../openFile";
import { handleOpenExplorer } from "../openExplorer";

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
    case DIRECTORY_COMMANDS.open_explorer:
      return handleOpenExplorer(context, panel);
  }
};
