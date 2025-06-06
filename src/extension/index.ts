import * as vscode from "vscode";
import { openWebView } from "./commands";
import { createPanel } from "./utils";

export function activate(context: vscode.ExtensionContext) {
  let panel: vscode.WebviewPanel | null = null;

  const exploreGitlantis = vscode.commands.registerCommand(
    "gitlantis.openWebview",
    () => {
      if (!panel) {
        panel = createPanel(context);

        panel.onDidDispose(() => {
          panel = null;
          context.globalState.update("gitlantisActive", false);
        });
      }

      openWebView(panel, context);
      context.globalState.update("gitlantisActive", true);
    }
  );

  context.subscriptions.push(exploreGitlantis);

  // Only reactivate if user manually triggered it before
  const shouldRestore = context.globalState.get<boolean>("gitlantisActive", false);

  if (shouldRestore && vscode.workspace.workspaceFolders?.length) {
    // Delay ensures workspace is fully loaded
    setTimeout(() => {
      vscode.commands.executeCommand("gitlantis.openWebview");
    }, 500);
  }

  // Re-run when workspace folders change, if previously active
  context.subscriptions.push(
    vscode.workspace.onDidChangeWorkspaceFolders(() => {
      const isActive = context.globalState.get<boolean>("gitlantisActive", false);
      if (isActive) {
        setTimeout(() => {
          vscode.commands.executeCommand("gitlantis.openWebview");
        }, 300);
      }
    })
  );
}
