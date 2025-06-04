import * as vscode from "vscode";

export const handleOpenFile = async (filePath: string) => {
  const uri = vscode.Uri.file(filePath);
  await vscode.window.showTextDocument(uri);
};
