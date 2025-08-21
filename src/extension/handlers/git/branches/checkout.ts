import * as vscode from "vscode";
import { GIT_COMMANDS } from "../../../config";
import type { THandlerMessage } from "../../../types";
import { getCurrentRepo } from "../../utils";

const checkoutBranch = async (branch: string = "", inputPath: string) => {
  const repo = getCurrentRepo(inputPath);
  if (!repo) throw new Error("Repository not found");

  const normalizedBranch = branch.replace(/^origin\//, "");
  const branches = await repo.getBranches({ remote: true });

  const filteredBranch = branches.find((b) => b.name === normalizedBranch);

  if (filteredBranch?.remote) {
    await repo.createBranch(normalizedBranch, true, filteredBranch.name);
    return;
  }

  if (!filteredBranch?.remote) {
    await repo.checkout(normalizedBranch);
    return;
  }

  throw new Error(
    `Could not checkout to inexistent branch: ${normalizedBranch}`
  );
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
    vscode.window.showErrorMessage((_error as Error).message);
  }
};
