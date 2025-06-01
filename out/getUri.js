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
exports.getHashedAssetUri = getHashedAssetUri;
exports.getWebviewUri = getWebviewUri;
exports.getUri = getUri;
const vscode = __importStar(require("vscode"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
function getHashedAssetUri(webview, extensionUri, assetFolder, filenamePrefix, extension) {
    const dirPath = path.join(vscode.Uri.joinPath(extensionUri, assetFolder).fsPath, 'assets');
    const files = fs.readdirSync(dirPath);
    const targetFile = files.find(file => file.startsWith(filenamePrefix) && file.endsWith(extension));
    if (!targetFile)
        return undefined;
    return webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, assetFolder, 'assets', targetFile));
}
function getWebviewUri(webview, extensionUri, relativePath) {
    const diskPath = vscode.Uri.joinPath(extensionUri, "out", relativePath);
    return webview.asWebviewUri(diskPath);
}
function getUri(webview, extensionUri, pathList) {
    return webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, ...pathList));
}
