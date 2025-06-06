import * as vscode from "vscode";
import { registerCommands, launchExtension } from "./commands";

export function activate(context: vscode.ExtensionContext) {
  registerCommands(context);
  launchExtension(context);
}
