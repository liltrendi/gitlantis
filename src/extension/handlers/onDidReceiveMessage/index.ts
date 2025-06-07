import * as vscode from "vscode";
import { type THandlerMessage } from "../../types";
import { DIRECTORY_COMMANDS } from "../../config";
import { handleReadDirectory } from "../readDirectory";
import { handleOpenFile } from "../openFile";
import { handleOpenExplorer } from "../openExplorer";

const SETTINGS_KEY = "__gitlantis_._settings__";

const handlePersistSettings = async (
  context: vscode.ExtensionContext,
  settings: any
) => {
  try {
    await context.globalState.update(SETTINGS_KEY, settings);
  } catch (error) {
    console.error("::gitlantis->persistenceFailure::", error);
  }
};

const handleLoadSettings = async (
  context: vscode.ExtensionContext,
  panel: vscode.WebviewPanel
) => {
  try {
    const persistedSettings = context.globalState.get(SETTINGS_KEY);
    panel.webview.postMessage({
      type: DIRECTORY_COMMANDS.settings_loaded,
      data: persistedSettings || null,
    });
  } catch (error) {
    panel.webview.postMessage({
      type: DIRECTORY_COMMANDS.settings_loaded,
      data: null,
    });
  }
};

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
    case DIRECTORY_COMMANDS.persist_settings:
      return handlePersistSettings(context, message.data);
    case DIRECTORY_COMMANDS.load_settings:
      return handleLoadSettings(context, panel);
  }
};

export default onDidReceiveMessage;
