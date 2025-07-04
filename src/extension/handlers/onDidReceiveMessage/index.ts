import * as vscode from "vscode";
import { type THandlerMessage } from "../../types";
import { DIRECTORY_COMMANDS } from "../../config";
import { handleReadDirectory } from "../readDirectory";
import { handleOpenFile } from "../openFile";
import { handleOpenExplorer } from "../openExplorer";
import { handleLoadSettings, handlePersistSettings } from "../handleSettings";

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
    case DIRECTORY_COMMANDS.load_settings:
      return handleLoadSettings(context, panel);
    case DIRECTORY_COMMANDS.persist_settings:
      return handlePersistSettings(context, message.data);
  }
};

export default onDidReceiveMessage;
