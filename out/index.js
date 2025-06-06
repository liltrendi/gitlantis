"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
const commands_1 = require("./commands");
function activate(context) {
    (0, commands_1.registerCommands)(context);
    (0, commands_1.launchExtension)(context);
}
