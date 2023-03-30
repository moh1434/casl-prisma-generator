"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeFileSyncRecursive = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
function writeFileSyncRecursive(filePath, content, charset) {
    (0, fs_1.mkdirSync)((0, path_1.dirname)(filePath), { recursive: true });
    (0, fs_1.writeFileSync)(filePath, content, charset);
}
exports.writeFileSyncRecursive = writeFileSyncRecursive;
//# sourceMappingURL=writeFileSyncRecursive.js.map