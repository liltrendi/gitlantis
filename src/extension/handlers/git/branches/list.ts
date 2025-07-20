import * as vscode from "vscode";
import { GIT_COMMANDS } from "../../../config";
import type { THandlerMessage } from "../../../types";
import type { Repository } from "../../../types/git";
import { getCurrentRepo } from "../../utils";

const getBranches = async (panel: vscode.WebviewPanel, repo: Repository) => {
  const branches = await repo.getBranches({ remote: true });
  const allBranches = branches
    .map((b) => b.name)
    .filter((name) => name !== "HEAD" && name !== "origin/HEAD");
  const currentBranch = repo.state.HEAD?.name || "unknown";

  panel.webview.postMessage({
    type: GIT_COMMANDS.list_branches,
    all: allBranches,
    current: currentBranch,
  });
};

const listenForBranchChanges = (
  panel: vscode.WebviewPanel,
  repo: Repository
) => {
  repo.state.onDidChange(() => {
    panel.webview.postMessage({
      type: GIT_COMMANDS.checkout_branch,
      current: repo.state.HEAD?.name,
    });
  });
};

export const handleListBranches = async (
  panel: vscode.WebviewPanel,
  message: THandlerMessage
) => {
  try {
    const repo = getCurrentRepo(message.path);

    if (!repo) {
      vscode.window.showErrorMessage(
        `Could not find a valid git repository for your current project`
      );
      return;
    }

    await getBranches(panel, repo);
    listenForBranchChanges(panel, repo);
  } catch (_error: unknown) {
    vscode.window.showErrorMessage(
      `Oops, something went wrong. Please try again.`
    );
  }
};
