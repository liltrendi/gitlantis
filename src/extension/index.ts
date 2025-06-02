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
        
        // When panel is disposed, clear the active state
        panel.onDidDispose(() => {
          panel = null;
          context.globalState.update('gitlantisActive', false);
        });
      }

      openWebView(panel, context);
      // Mark extension as active
      context.globalState.update('gitlantisActive', true);
    }
  );

  context.subscriptions.push(exploreGitlantis);

  // Check if we need to restore webview immediately (after folder change or startup)
  const shouldRestore = context.globalState.get<boolean>('gitlantisActive', false);
  if (shouldRestore) {
    // Delay to ensure workspace is loaded
    setTimeout(() => {
      vscode.commands.executeCommand('gitlantis.openWebview');
    }, 500);
  }

  // Listen for workspace changes only when extension should be active
  const workspaceListener = vscode.workspace.onDidChangeWorkspaceFolders(() => {
    const isActive = context.globalState.get<boolean>('gitlantisActive', false);
    if (isActive) {
      // Delay to ensure new workspace is loaded
      setTimeout(() => {
        vscode.commands.executeCommand('gitlantis.openWebview');
      }, 300);
    }
  });

  context.subscriptions.push(workspaceListener);
}