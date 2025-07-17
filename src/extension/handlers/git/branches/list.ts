import * as vscode from "vscode";
import { GIT_COMMANDS } from "../../../config";
import type { THandlerMessage } from "../../../types";
import type { GitExtension, Repository } from "../../../types/git";

const getProjectBranches = async (inputPath?: string | null) => {
  const gitExtension =
    vscode.extensions.getExtension<GitExtension>("vscode.git")?.exports;
  const api = gitExtension?.getAPI(1);

  if (!api) {
    throw new Error("Git extension not available");
  }

  const repo = api.repositories.find((r) => {
    if (!inputPath) return true;
    return r.rootUri.fsPath === inputPath;
  });

  if (!repo) {
    throw new Error("No Git repository found for the given path");
  }

  const branches = await repo.getBranches({ remote: true });
  return branches
    .map((b) => b.name)
    .filter((name) => name !== "HEAD" && name !== "origin/HEAD");
};

const getCurrentBranch = async (inputPath?: string | null) => {
  const gitExtension = vscode.extensions.getExtension("vscode.git")?.exports;
  const api = gitExtension?.getAPI(1);

  if (!api) {
    throw new Error("Git extension not available");
  }

  const repo = api.repositories.find((r: Repository) => {
    if (!inputPath) return true;
    return r.rootUri.fsPath === inputPath;
  });

  if (!repo) {
    throw new Error("No Git repository found for the given path");
  }

  return repo.state.HEAD?.name || "unknown";
};

export const handleListBranches = async (
  panel: vscode.WebviewPanel,
  message: THandlerMessage
) => {
  try {
    const allBranches = await getProjectBranches(message.path);
    const currentBranch = await getCurrentBranch(message.path);

    panel.webview.postMessage({
      type: GIT_COMMANDS.list_branches,
      all: allBranches,
      current: currentBranch,
    });
  } catch (_error: unknown) {
    // ignore for now as user may be in empty project
  }
};
