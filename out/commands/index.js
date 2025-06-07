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
exports.launchExtension = exports.registerCommands = exports.getLauncher = exports.LAUNCH_COMMAND = exports.LAUNCH_MARKER = void 0;
const vscode = __importStar(require("vscode"));
const utils_1 = require("../utils");
const onDidReceiveMessage_1 = require("../handlers/onDidReceiveMessage");
exports.LAUNCH_MARKER = "gitlantisActive";
exports.LAUNCH_COMMAND = "gitlantis.start";
const getLauncher = (context) => {
    let panel = (0, utils_1.createPanel)(context);
    panel.onDidDispose(() => {
        panel = null;
        context.globalState.update(exports.LAUNCH_MARKER, false);
    });
    const scripts = (0, utils_1.getTranspiledScripts)(panel, context);
    if (!scripts)
        return;
    const publicAssets = (0, utils_1.getPublicAssets)(panel, context);
    panel.webview.html = (0, utils_1.getWebviewPage)({ scripts, publicAssets });
    panel.webview.onDidReceiveMessage((message) => (0, onDidReceiveMessage_1.onDidReceiveMessage)({
        panel: panel,
        context,
        message,
    }));
    panel.reveal(vscode.ViewColumn.One);
    context.globalState.update(exports.LAUNCH_MARKER, true);
};
exports.getLauncher = getLauncher;
const registerCommands = (context) => {
    const launchExtension = vscode.commands.registerCommand(exports.LAUNCH_COMMAND, () => (0, exports.getLauncher)(context));
    context.subscriptions.push(launchExtension);
};
exports.registerCommands = registerCommands;
const relaunchOnFolderChange = (context) => {
    context.subscriptions.push(vscode.workspace.onDidChangeWorkspaceFolders(() => {
        const isActive = context.globalState.get(exports.LAUNCH_MARKER, false);
        if (isActive) {
            setTimeout(() => {
                vscode.commands.executeCommand(exports.LAUNCH_COMMAND);
            }, 300);
        }
    }));
};
const launchExtension = (context) => {
    const shouldRestore = context.globalState.get(exports.LAUNCH_MARKER, false);
    if (shouldRestore && vscode.workspace.workspaceFolders?.length) {
        setTimeout(() => {
            vscode.commands.executeCommand(exports.LAUNCH_COMMAND);
        }, 500);
    }
    relaunchOnFolderChange(context);
};
exports.launchExtension = launchExtension;
