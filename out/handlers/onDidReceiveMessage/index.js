"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.onDidReceiveMessage = void 0;
const vscode = __importStar(require("vscode"));
const config_1 = require("../../config");
const onDidReceiveMessage = async ({ context, panel, message, }) => {
    if (message.type === config_1.DIRECTORY_COMMANDS.read) {
        let folderPath;
        try {
            if (message.path === config_1.ROOT_DIRECTORY_KEY) {
                const folders = vscode.workspace.workspaceFolders;
                if (!folders || folders.length === 0) {
                    throw new Error();
                }
                folderPath = folders[0].uri.fsPath;
            }
            else {
                folderPath = message.path;
            }
            const folderUri = vscode.Uri.file(folderPath);
            const entries = await vscode.workspace.fs.readDirectory(folderUri);
            const items = entries.map(([name, type]) => ({
                name,
                type: type === vscode.FileType.Directory ? "folder" : "file",
            }));
            panel.webview.postMessage({
                type: config_1.DIRECTORY_RESPONSE.children,
                path: message.path,
                children: items,
            });
        }
        catch (error) {
            panel.webview.postMessage({
                type: config_1.DIRECTORY_RESPONSE.error,
                path: message.path,
                error: {
                    type: config_1.DIRECTORY_ERRORS.no_open_project,
                    message: "You have no active project open at the moment.",
                },
            });
        }
    }
    else if (message.type === config_1.DIRECTORY_COMMANDS.open_file_explorer) {
        try {
            const selected = await vscode.window.showOpenDialog({
                canSelectFolders: true,
                canSelectMany: false,
                openLabel: "Open Folder",
            });
            if (!selected || selected.length === 0) {
                panel.webview.postMessage({
                    type: config_1.DIRECTORY_RESPONSE.error,
                    path: config_1.ROOT_DIRECTORY_KEY,
                    error: {
                        type: config_1.DIRECTORY_ERRORS.no_open_project,
                        message: "You have no active project open at the moment.",
                    },
                });
                return;
            }
            // mark that extension should reopen after folder change
            context.globalState.update("gitlantisActive", true);
            await vscode.commands.executeCommand("vscode.openFolder", selected[0], false);
        }
        catch (err) {
            panel.webview.postMessage({
                type: config_1.DIRECTORY_RESPONSE.error,
                path: config_1.ROOT_DIRECTORY_KEY,
                error: {
                    type: config_1.DIRECTORY_ERRORS.generic,
                    message: err.message,
                },
            });
        }
    }
};
exports.onDidReceiveMessage = onDidReceiveMessage;
