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
exports.activate = activate;
const vscode = __importStar(require("vscode"));
const commands_1 = require("./commands");
const utils_1 = require("./utils");
function activate(context) {
    let panel = null;
    const exploreGitlantis = vscode.commands.registerCommand("gitlantis.openWebview", () => {
        if (!panel) {
            panel = (0, utils_1.createPanel)(context);
            // When panel is disposed, clear the active state
            panel.onDidDispose(() => {
                panel = null;
                context.globalState.update('gitlantisActive', false);
            });
        }
        (0, commands_1.openWebView)(panel, context);
        // Mark extension as active
        context.globalState.update('gitlantisActive', true);
    });
    context.subscriptions.push(exploreGitlantis);
    // Check if we need to restore webview immediately (after folder change or startup)
    const shouldRestore = context.globalState.get('gitlantisActive', false);
    if (shouldRestore) {
        // Delay to ensure workspace is loaded
        setTimeout(() => {
            vscode.commands.executeCommand('gitlantis.openWebview');
        }, 500);
    }
    // Listen for workspace changes only when extension should be active
    const workspaceListener = vscode.workspace.onDidChangeWorkspaceFolders(() => {
        const isActive = context.globalState.get('gitlantisActive', false);
        if (isActive) {
            // Delay to ensure new workspace is loaded
            setTimeout(() => {
                vscode.commands.executeCommand('gitlantis.openWebview');
            }, 300);
        }
    });
    context.subscriptions.push(workspaceListener);
}
