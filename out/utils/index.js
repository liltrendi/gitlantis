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
exports.getWebviewPage = exports.createPanel = exports.getPublicAssets = exports.getTranspiledScripts = exports.getUri = exports.getHashedAssetUri = void 0;
const vscode = __importStar(require("vscode"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const models_1 = require("../config/models");
const getHashedAssetUri = (webview, extensionUri, assetFolder, filenamePrefix, extension) => {
    const dirPath = path.join(vscode.Uri.joinPath(extensionUri, assetFolder).fsPath, "assets");
    const files = fs.readdirSync(dirPath);
    const targetFile = files.find((file) => file.startsWith(filenamePrefix) && file.endsWith(extension));
    if (!targetFile)
        return undefined;
    return webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, assetFolder, "assets", targetFile));
};
exports.getHashedAssetUri = getHashedAssetUri;
const getUri = (webview, extensionUri, pathList) => {
    return webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, ...pathList));
};
exports.getUri = getUri;
const getTranspiledScripts = (panel, context) => {
    const scriptUri = (0, exports.getHashedAssetUri)(panel.webview, context.extensionUri, "out", "index", ".js");
    const styleUri = (0, exports.getHashedAssetUri)(panel.webview, context.extensionUri, "out", "index", ".css");
    const workspaceFoldersUri = vscode.workspace.workspaceFolders?.[0]?.uri.toString() ?? "";
    if (!scriptUri || !styleUri) {
        vscode.window.showErrorMessage("gitlantis::failed to load scripts");
        return null;
    }
    return { scriptUri, styleUri, workspaceFoldersUri };
};
exports.getTranspiledScripts = getTranspiledScripts;
const getPublicAssets = (panel, context) => {
    const assetUrisWithUri = Object.entries(models_1.GLOBAL_MODEL_URLS).reduce((acc, [key, value]) => {
        const typedKey = key;
        acc[`${typedKey}Uri`] = (0, exports.getUri)(panel.webview, context.extensionUri, [`out`, ...value.split("/")]);
        return acc;
    }, {});
    console.log("____", assetUrisWithUri);
    return assetUrisWithUri;
};
exports.getPublicAssets = getPublicAssets;
const createPanel = (context) => {
    const panel = vscode.window.createWebviewPanel("gitlantisWebView", "Gitlantis", vscode.ViewColumn.One, {
        enableScripts: true,
        retainContextWhenHidden: true,
        localResourceRoots: [
            vscode.Uri.joinPath(context.extensionUri, "out"),
            vscode.Uri.joinPath(context.extensionUri, "out", "assets"),
            vscode.Uri.joinPath(context.extensionUri, "out", "models"),
            vscode.Uri.joinPath(context.extensionUri, "out", "music"),
            vscode.Uri.joinPath(context.extensionUri, "out", "images"),
        ],
    });
    const faviconPath = vscode.Uri.joinPath(context.extensionUri, "out", "images", "favicon.png");
    panel.iconPath = {
        light: faviconPath,
        dark: faviconPath,
    };
    return panel;
};
exports.createPanel = createPanel;
const getWebviewPage = ({ scripts, publicAssets, }) => {
    const serializedAssets = Object.fromEntries(Object.entries(publicAssets).map(([key, uri]) => {
        const baseKey = key.endsWith("Uri") ? key.slice(0, -3) : key;
        return [baseKey, uri.toString()];
    }));
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/png" href="${publicAssets.faviconUri}" />
        <link rel="stylesheet" href="${scripts?.styleUri}" />
        <title>Gitlantis</title>
      </head>
      <body>
        <div id="root"></div>
        <script>
          window.__GLOBAL_URIS__ = ${JSON.stringify(serializedAssets, null, 2)};
          window.__GITLANTIS_ROOT__ = "${scripts?.workspaceFoldersUri}";
        </script>
        <script type="module" src="${scripts?.scriptUri}"></script>
      </body>
      </html>
    `;
};
exports.getWebviewPage = getWebviewPage;
