"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleLoadSettings = exports.handlePersistSettings = void 0;
const config_1 = require("../../config");
const store_1 = require("../../store");
const handlePersistSettings = async (context, settings) => {
    try {
        await context.globalState.update(store_1.PERSISTED_SETTINGS_KEY, settings);
    }
    catch (error) {
        console.error("::gitlantis->persistenceFailure::", error);
    }
};
exports.handlePersistSettings = handlePersistSettings;
const handleLoadSettings = async (context, panel) => {
    try {
        const persistedSettings = context.globalState.get(store_1.PERSISTED_SETTINGS_KEY);
        panel.webview.postMessage({
            type: config_1.DIRECTORY_COMMANDS.settings_loaded,
            data: persistedSettings || null,
        });
    }
    catch (_) {
        panel.webview.postMessage({
            type: config_1.DIRECTORY_COMMANDS.settings_loaded,
            data: null,
        });
    }
};
exports.handleLoadSettings = handleLoadSettings;
