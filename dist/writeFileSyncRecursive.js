"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeFileSyncRecursive = void 0;
var fs = require("fs");
var path = require("path");
function writeFileSyncRecursive(filePath, content, charset) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, content, charset);
}
exports.writeFileSyncRecursive = writeFileSyncRecursive;
//# sourceMappingURL=writeFileSyncRecursive.js.map