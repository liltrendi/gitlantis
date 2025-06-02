import * as vscode from "vscode";
import { getModels, getTranspiledScripts, getWebviewPage } from "../utils";
import { onDidReceiveMessage } from "../handlers/onDidReceiveMessage";

export const openWebView = (
  panel: vscode.WebviewPanel,
  context: vscode.ExtensionContext
) => {
  const scripts = getTranspiledScripts(panel, context);

  if (!scripts) return;

  const models = getModels(panel, context);

  panel.webview.html = getWebviewPage({ scripts, models });
  panel.webview.onDidReceiveMessage((message) =>
    onDidReceiveMessage({ panel, context, message })
  );

  // Show the panel
  panel.reveal(vscode.ViewColumn.One);
};