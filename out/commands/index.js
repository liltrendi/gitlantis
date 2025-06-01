"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openWebView = void 0;
const utils_1 = require("../utils");
const openWebView = (context) => {
    const panel = (0, utils_1.createPanel)(context);
    const scripts = (0, utils_1.getTranspiledScripts)(panel, context);
    if (!scripts)
        return;
    const models = (0, utils_1.getModels)(panel, context);
    panel.webview.html = (0, utils_1.getWebviewPage)({ scripts, models });
};
exports.openWebView = openWebView;
