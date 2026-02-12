import * as vscode from "vscode";
import { type THandlerMessage } from "@gitlantis/types";
import { DIRECTORY_COMMANDS, GIT_COMMANDS } from "@extension/config";
import { handleReadDirectory } from "@extension/handlers/readDirectory";
import { handleOpenFile } from "@extension/handlers/openFile";
import { handleOpenExplorer } from "@extension/handlers/openExplorer";
import {
  handleLoadSettings,
  handlePersistSettings,
} from "@extension/handlers/handleSettings";
import { handleListBranches } from "@extension/handlers/git/branches/list";
import { handleCheckoutBranch } from "@extension/handlers/git/branches/checkout";

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
    case GIT_COMMANDS.list_branches:
      return handleListBranches(panel, message);
    case GIT_COMMANDS.checkout_branch:
      return handleCheckoutBranch(panel, message);
  }
};

export default onDidReceiveMessage;
