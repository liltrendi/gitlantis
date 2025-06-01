import * as vscode from "vscode";
import { openWebView } from "./commands";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("gitlantis.openWebview", () =>
      openWebView(context)
    )
  );
}
