"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const commands_1 = require("./commands");
const activate = (context) => {
    (0, commands_1.registerCommands)(context);
    (0, commands_1.launchExtension)(context);
};
exports.activate = activate;
