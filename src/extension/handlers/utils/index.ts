import * as vscode from "vscode";
import * as path from "path";
import { DIRECTORY_RESPONSE, ROOT_DIRECTORY_KEY } from "../../config";
import type { GitExtension, Repository } from "../../types/git";

export const getRelativePath = (
  absolutePath: string,
  rootPath: string
): string => {
  const relative = path.relative(rootPath, absolutePath);
  return relative === "" ? ROOT_DIRECTORY_KEY : relative;
};

export const getWorkspaceFolderFromPath = (
  inputPath: string | null | undefined
): vscode.WorkspaceFolder & { baseFolder: string } => {
  if (!inputPath || inputPath === ROOT_DIRECTORY_KEY) {
    const folders = vscode.workspace.workspaceFolders;
    if (!folders || folders.length === 0) {
      throw new Error("No workspace folder found.");
    }
    return { ...folders[0], baseFolder: folders[0].uri.path };
  }

  const folderUri = vscode.Uri.file(inputPath);

  return {
    name: path.basename(folderUri.path),
    uri: folderUri,
    index: 0,
    baseFolder:
      vscode.workspace.workspaceFolders?.[0].uri.path ?? ROOT_DIRECTORY_KEY,
  };
};

export const sendError = (
  panel: vscode.WebviewPanel,
  path: string,
  errorType: string,
  message: string
) => {
  panel.webview.postMessage({
    type: DIRECTORY_RESPONSE.error,
    path,
    error: { type: errorType, message },
  });
};

export const getGitApi = () => {
  const gitExtension =
    vscode.extensions.getExtension<GitExtension>("vscode.git")?.exports;
  const api = gitExtension?.getAPI(1);

  return api;
};

export const getCurrentRepo = (path: string) => {
  const api = getGitApi();

  const repo = api?.repositories.find((r: Repository) => {
    if (!path) return true;
    return r.rootUri.fsPath === path;
  });

  return repo;
};
