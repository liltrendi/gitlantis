"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onDidReceiveMessage = void 0;
const config_1 = require("../../config");
const readDirectory_1 = require("../readDirectory");
const openFile_1 = require("../openFile");
const openExplorer_1 = require("../openExplorer");
const SETTINGS_KEY = "__gitlantis_._settings__";
const handlePersistSettings = async (context, settings) => {
    try {
        await context.globalState.update(SETTINGS_KEY, settings);
    }
    catch (error) {
        console.error("::gitlantis->persistenceFailure::", error);
    }
};
const handleLoadSettings = async (context, panel) => {
    try {
        const persistedSettings = context.globalState.get(SETTINGS_KEY);
        panel.webview.postMessage({
            type: config_1.DIRECTORY_COMMANDS.settings_loaded,
            data: persistedSettings || null,
        });
    }
    catch (error) {
        panel.webview.postMessage({
            type: config_1.DIRECTORY_COMMANDS.settings_loaded,
            data: null,
        });
    }
};
const onDidReceiveMessage = async ({ context, panel, message, }) => {
    switch (message.type) {
        case config_1.DIRECTORY_COMMANDS.read_directory:
            return (0, readDirectory_1.handleReadDirectory)(panel, message);
        case config_1.DIRECTORY_COMMANDS.open_file:
            return (0, openFile_1.handleOpenFile)(message.path);
        case config_1.DIRECTORY_COMMANDS.open_explorer:
            return (0, openExplorer_1.handleOpenExplorer)(context, panel);
        case config_1.DIRECTORY_COMMANDS.persist_settings:
            return handlePersistSettings(context, message.data);
        case config_1.DIRECTORY_COMMANDS.load_settings:
            return handleLoadSettings(context, panel);
    }
};
exports.onDidReceiveMessage = onDidReceiveMessage;
exports.default = exports.onDidReceiveMessage;
