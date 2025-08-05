import * as vscode from "vscode";

export const handleOpenFile = async (filePath: string) => {
  try {
    const uri = vscode.Uri.file(filePath);
    await vscode.window.showTextDocument(uri);
  } catch (_error: unknown) {
    vscode.window.showErrorMessage(`Cannot open the file at: ${filePath}`);
  }
};
