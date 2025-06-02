import * as vscode from "vscode";
import { openWebView, restoreWebViewOnFolderChange } from "./commands";
import { createPanel } from "./utils";

export function activate(context: vscode.ExtensionContext) {
  const panel = createPanel(context);

  restoreWebViewOnFolderChange(panel, context)

  const exploreGitlantis = vscode.commands.registerCommand(
    "gitlantis.openWebview",
    () => openWebView(panel, context)
  );

  context.subscriptions.push(exploreGitlantis);
}
