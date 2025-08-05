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
exports.getCurrentRepo = exports.getGitApi = exports.sendError = exports.getWorkspaceFolderFromPath = exports.getRelativePath = void 0;
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
const config_1 = require("../../config");
const getRelativePath = (absolutePath, rootPath) => {
    const relative = path.relative(rootPath, absolutePath);
    return relative === "" ? config_1.ROOT_DIRECTORY_KEY : relative;
};
exports.getRelativePath = getRelativePath;
const getWorkspaceFolderFromPath = (inputPath) => {
    if (!inputPath || inputPath === config_1.ROOT_DIRECTORY_KEY) {
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
        baseFolder: vscode.workspace.workspaceFolders?.[0].uri.path ?? config_1.ROOT_DIRECTORY_KEY,
    };
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
const getGitApi = () => {
    const gitExtension = vscode.extensions.getExtension("vscode.git")?.exports;
    const api = gitExtension?.getAPI(1);
    return api;
};
exports.getGitApi = getGitApi;
const getCurrentRepo = (path) => {
    const api = (0, exports.getGitApi)();
    const repo = api?.repositories.find((r) => {
        if (!path)
            return true;
        return r.rootUri.fsPath === path;
    });
    return repo;
};
exports.getCurrentRepo = getCurrentRepo;
