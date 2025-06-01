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
const getUri_1 = require("./getUri");
function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand("gitlantis.openWebview", () => {
        const panel = vscode.window.createWebviewPanel("gitlantisWebView", "Gitlantis", vscode.ViewColumn.One, {
            enableScripts: true,
            localResourceRoots: [
                vscode.Uri.joinPath(context.extensionUri, "out"),
                vscode.Uri.joinPath(context.extensionUri, "out", "assets"),
                vscode.Uri.joinPath(context.extensionUri, "out", "models"),
                vscode.Uri.joinPath(context.extensionUri, "out", "music"),
            ],
        });
        const scriptUri = (0, getUri_1.getHashedAssetUri)(panel.webview, context.extensionUri, 'out', 'index', '.js');
        const styleUri = (0, getUri_1.getHashedAssetUri)(panel.webview, context.extensionUri, 'out', 'index', '.css');
        if (!scriptUri || !styleUri) {
            vscode.window.showErrorMessage('Failed to load Gitlantis assets');
            return;
        }
        const boatModelUri = (0, getUri_1.getUri)(panel.webview, context.extensionUri, [
            "out",
            "models",
            "boat",
            "scene-transformed.glb",
        ]);
        const cabinetModelUri = (0, getUri_1.getUri)(panel.webview, context.extensionUri, [
            "out",
            "models",
            "cabinet",
            "cabinet.glb",
        ]);
        const waterTextureUri = (0, getUri_1.getUri)(panel.webview, context.extensionUri, [
            "out",
            "models",
            "ocean",
            "waternormals.jpeg",
        ]);
        panel.webview.html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="stylesheet" href="${styleUri}" />
          <title>Gitlantis</title>
        </head>
        <body>
          <div id="root"></div>
          <script>
            window.__MODEL_URIS__ = {
              boat: "${boatModelUri}",
              cabinet: "${cabinetModelUri}",
              water: "${waterTextureUri}"
            };
          </script>
          <script type="module" src="${scriptUri}"></script>
        </body>
        </html>
      `;
    }));
}
