"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GIT_ERRORS = exports.GIT_COMMANDS = exports.DIRECTORY_ERRORS = exports.DIRECTORY_RESPONSE = exports.DIRECTORY_COMMANDS = exports.ROOT_DIRECTORY_KEY = void 0;
exports.ROOT_DIRECTORY_KEY = "__root__";
exports.DIRECTORY_COMMANDS = {
    read_directory: "read_directory",
    open_file: "open_file",
    open_explorer: "open_explorer",
    persist_settings: "persist_settings",
    load_settings: "load_settings",
    settings_loaded: "settings_loaded",
};
exports.DIRECTORY_RESPONSE = {
    data: "data",
    error: "read_error",
};
exports.DIRECTORY_ERRORS = {
    vscode_api_error: "vscode-api-error",
    no_open_project: "no-project-open",
    generic: "generic",
};
exports.GIT_COMMANDS = {
    list_branches: "list_branches",
    checkout_branch: "checkout_branch",
};
exports.GIT_ERRORS = {
    listing_error: "listing_error",
    checkout_error: "checkout_error",
    generic: "generic",
};
