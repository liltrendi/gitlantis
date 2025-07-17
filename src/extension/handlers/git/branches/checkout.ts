import { GIT_COMMANDS } from "../../../config";
import type { THandlerMessage } from "../../../types";
import type { GitExtension } from "../../../types/git";
import * as vscode from "vscode";

const checkoutBranch = async (branch: string = "", inputPath?: string) => {
  const gitExtension =
    vscode.extensions.getExtension<GitExtension>("vscode.git")?.exports;
  const api = gitExtension?.getAPI(1);
  if (!api) throw new Error("Git API not available");

  const repo = api.repositories.find((r) => {
    if (!inputPath) return true;
    return r.rootUri.fsPath === inputPath;
  });
  if (!repo) throw new Error("Repository not found");

  const normalizedBranch = branch.replace(/^origin\//, "");
  const branches = await repo.getBranches({ remote: true });

  const localExists = branches.some(
    (b) => b.name === normalizedBranch && !b.remote
  );
  const remoteBranch = branches.find(
    (b) => b.name === normalizedBranch && b.remote
  );

  if (localExists) {
    await repo.checkout(normalizedBranch);
  } else if (remoteBranch) {
    await repo.createBranch(
      normalizedBranch,
      true,
      `origin/${normalizedBranch}`
    );
  } else {
    throw new Error(
      `Branch '${normalizedBranch}' not found locally or remotely`
    );
  }
};

export const handleCheckoutBranch = async (
  panel: vscode.WebviewPanel,
  message: THandlerMessage
) => {
  try {
    await checkoutBranch(message.branch, message.path);

    panel.webview.postMessage({
      type: GIT_COMMANDS.checkout_branch,
      current: message.branch,
    });
  } catch (_error: unknown) {
    vscode.window.showErrorMessage(
      `Unable to checkout to the branch: ${message.branch}`
    );
  }
};
