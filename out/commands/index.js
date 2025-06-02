"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restoreWebViewOnFolderChange = exports.openWebView = void 0;
const utils_1 = require("../utils");
const onDidReceiveMessage_1 = require("../handlers/onDidReceiveMessage");
const openWebView = (panel, context) => {
    const scripts = (0, utils_1.getTranspiledScripts)(panel, context);
    if (!scripts)
        return;
    const models = (0, utils_1.getModels)(panel, context);
    panel.webview.html = (0, utils_1.getWebviewPage)({ scripts, models });
    panel.webview.onDidReceiveMessage((message) => (0, onDidReceiveMessage_1.onDidReceiveMessage)({ panel, context, message }));
};
exports.openWebView = openWebView;
const restoreWebViewOnFolderChange = (panel, context) => {
    const shouldReopenWebview = context.globalState.get("shouldReopenWebview");
    if (shouldReopenWebview) {
        (0, exports.openWebView)(panel, context);
        context.globalState.update("shouldReopenWebview", false);
    }
};
exports.restoreWebViewOnFolderChange = restoreWebViewOnFolderChange;
