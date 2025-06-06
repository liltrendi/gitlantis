import * as vscode from "vscode";
import {
  createPanel,
  getModels,
  getTranspiledScripts,
  getWebviewPage,
} from "../utils";
import { onDidReceiveMessage } from "../handlers/onDidReceiveMessage";

export const LAUNCH_MARKER = "gitlantisActive";
export const LAUNCH_COMMAND = "gitlantis.start";

export const getLauncher = (context: vscode.ExtensionContext) => {
  let panel: vscode.WebviewPanel | null = createPanel(context);

  panel.onDidDispose(() => {
    panel = null;
    context.globalState.update(LAUNCH_MARKER, false);
  });

  const scripts = getTranspiledScripts(panel, context);

  if (!scripts) return;

  const models = getModels(panel, context);

  panel.webview.html = getWebviewPage({ scripts, models });
  panel.webview.onDidReceiveMessage((message) =>
    onDidReceiveMessage({
      panel: panel as vscode.WebviewPanel,
      context,
      message,
    })
  );

  panel.reveal(vscode.ViewColumn.One);
  context.globalState.update(LAUNCH_MARKER, true);
};

export const registerCommands = (context: vscode.ExtensionContext) => {
  const launchExtension = vscode.commands.registerCommand(LAUNCH_COMMAND, () =>
    getLauncher(context)
  );

  context.subscriptions.push(launchExtension);
};

const relaunchOnFolderChange = (context: vscode.ExtensionContext) => {
  context.subscriptions.push(
    vscode.workspace.onDidChangeWorkspaceFolders(() => {
      const isActive = context.globalState.get<boolean>(LAUNCH_MARKER, false);
      if (isActive) {
        setTimeout(() => {
          vscode.commands.executeCommand(LAUNCH_COMMAND);
        }, 300);
      }
    })
  );
};

export const launchExtension = (context: vscode.ExtensionContext) => {
  const shouldRestore = context.globalState.get<boolean>(LAUNCH_MARKER, false);

  if (shouldRestore && vscode.workspace.workspaceFolders?.length) {
    setTimeout(() => {
      vscode.commands.executeCommand(LAUNCH_COMMAND);
    }, 500);
  }

  relaunchOnFolderChange(context);
};
