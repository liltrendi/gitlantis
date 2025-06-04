import * as vscode from "vscode";
import { DIRECTORY_ERRORS, ROOT_DIRECTORY_KEY } from "../../config";
import { sendError } from "../utils";

export const handleOpenExplorer = async (
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
