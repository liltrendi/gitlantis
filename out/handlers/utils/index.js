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
exports.sendError = exports.getWorkspaceFolderFromPath = exports.getFolderUri = void 0;
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const config_1 = require("../../config");
const getFolderUri = (path) => {
    if (!path || path === config_1.ROOT_DIRECTORY_KEY) {
        const folders = vscode.workspace.workspaceFolders;
        if (!folders || folders.length === 0) {
            throw new Error("No workspace folder found.");
        }
        return folders[0].uri;
    }
    return vscode.Uri.file(path);
};
exports.getFolderUri = getFolderUri;
const getWorkspaceFolderFromPath = (inputPath) => {
    const folders = vscode.workspace.workspaceFolders;
    if (!folders || folders.length === 0) {
        throw new Error("No workspace folder found.");
    }
    if (!inputPath || inputPath === config_1.ROOT_DIRECTORY_KEY) {
        return folders[0];
    }
    const folderPath = fs.existsSync(inputPath) && fs.lstatSync(inputPath).isDirectory()
        ? inputPath
        : path.dirname(inputPath);
    const folderUri = vscode.Uri.file(folderPath);
    const folder = folders.find(folder => folder.uri.fsPath === folderUri.fsPath || folderUri.fsPath.startsWith(folder.uri.fsPath));
    if (!folder) {
        throw new Error(`No matching workspace folder found for path: ${inputPath}`);
    }
    return folder;
};
exports.getWorkspaceFolderFromPath = getWorkspaceFolderFromPath;
const sendError = (panel, path, errorType, message) => {
    panel.webview.postMessage({
        type: config_1.DIRECTORY_RESPONSE.error,
        path,
        error: { type: errorType, message },
    });
};
exports.sendError = sendError;
