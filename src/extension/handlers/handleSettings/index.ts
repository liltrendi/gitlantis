import * as vscode from "vscode";
import { DIRECTORY_COMMANDS } from "../../config";

export const PERSISTED_SETTINGS_KEY = "__gitlantis_._settings__";

export const handlePersistSettings = async (
  context: vscode.ExtensionContext,
  settings: any
) => {
  try {
    await context.globalState.update(PERSISTED_SETTINGS_KEY, settings);
  } catch (error) {
    console.error("::gitlantis->persistenceFailure::", error);
  }
};

export const handleLoadSettings = async (
  context: vscode.ExtensionContext,
  panel: vscode.WebviewPanel
) => {
  try {
    const persistedSettings = context.globalState.get(PERSISTED_SETTINGS_KEY);
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
