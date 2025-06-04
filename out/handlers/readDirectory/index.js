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
exports.handleReadDirectory = void 0;
const vscode = __importStar(require("vscode"));
const config_1 = require("../../config");
const utils_1 = require("../utils");
const handleReadDirectory = async (panel, message) => {
    try {
        const folderUri = (0, utils_1.getFolderUri)(message.path);
        const entries = await vscode.workspace.fs.readDirectory(folderUri);
        const children = entries.map(([name, type]) => ({
            name,
            path: vscode.Uri.joinPath(folderUri, name),
            type: type === vscode.FileType.Directory ? "folder" : "file",
        }));
        panel.webview.postMessage({
            type: config_1.DIRECTORY_RESPONSE.children,
            path: message.path,
            children,
        });
    }
    catch (error) {
        (0, utils_1.sendError)(panel, message.path, config_1.DIRECTORY_ERRORS.no_open_project, "You have no active project open at the moment.");
    }
};
exports.handleReadDirectory = handleReadDirectory;
