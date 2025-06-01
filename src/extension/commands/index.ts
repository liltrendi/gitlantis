import * as vscode from "vscode";
import {
  createPanel,
  getModels,
  getTranspiledScripts,
  getWebviewPage,
} from "../utils";

export const openWebView = (context: vscode.ExtensionContext) => {
  const panel = createPanel(context);
  const scripts = getTranspiledScripts(panel, context);

  if (!scripts) return;

  const models = getModels(panel, context);

  panel.webview.html = getWebviewPage({ scripts, models });
};
