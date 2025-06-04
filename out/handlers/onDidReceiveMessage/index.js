"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onDidReceiveMessage = void 0;
const config_1 = require("../../config");
const readDirectory_1 = require("../readDirectory");
const openFile_1 = require("../openFile");
const openExplorer_1 = require("../openExplorer");
const onDidReceiveMessage = async ({ context, panel, message, }) => {
    switch (message.type) {
        case config_1.DIRECTORY_COMMANDS.read_directory:
            return (0, readDirectory_1.handleReadDirectory)(panel, message);
        case config_1.DIRECTORY_COMMANDS.open_file:
            return (0, openFile_1.handleOpenFile)(message.path);
        case config_1.DIRECTORY_COMMANDS.open_explorer:
            return (0, openExplorer_1.handleOpenExplorer)(context, panel);
    }
};
exports.onDidReceiveMessage = onDidReceiveMessage;
