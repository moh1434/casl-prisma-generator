"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCaslSubjectsToFile = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
var writeFileSyncRecursive_1 = require("./writeFileSyncRecursive");
function extractModelsNames(prismaSchemaPath) {
    var schemaContent = (0, fs_1.readFileSync)(prismaSchemaPath).toString();
    var regex = /model\s+(\w+)\s+{/g;
    var matches = [];
    var match;
    while ((match = regex.exec(schemaContent)) !== null) {
        matches.push(match[1]);
    }
    return matches;
}
function generateCaslSubjectsList(models, prismaClientPath, overrides) {
    if (overrides === void 0) { overrides = {}; }
    for (var _i = 0, _a = Object.keys(overrides); _i < _a.length; _i++) {
        var override = _a[_i];
        if (!models.includes(override)) {
            var error = "Override [".concat(override, "] is not in your prisma models");
            console.error(error);
            throw new Error(error);
        }
    }
    var customImports = [];
    var prismaImports = [];
    var content = ['export type SubjectsList = {'];
    models.map(function (model) {
        if (model in overrides) {
            customImports.push(overrides[model].importPath);
            content.push("  ".concat(model, ": ").concat(overrides[model].typeName, ";"));
        }
        else {
            prismaImports.push(model);
            content.push("  ".concat(model, ": ").concat(model, ";"));
        }
    });
    content.push('};');
    var stringCustomImports = customImports.join('\n');
    var stringPrismaImportsNames = prismaImports.join(', ');
    var allPrismaImports = "import { ".concat(stringPrismaImportsNames, " } from '").concat(prismaClientPath, "';");
    var result = "/** this file is auto generated, don't touch it **/\n\n" +
        allPrismaImports +
        '\n' +
        stringCustomImports +
        '\n\n' +
        content.join('\n') +
        '\n';
    return result;
}
var defaultPaths = {
    outputPath: (0, path_1.resolve)(__dirname, 'generated/subjectsList.ts'),
    prismaSchemaPath: 'prisma/schema.prisma',
    prismaClientPath: '@prisma/client',
};
function generateCaslSubjectsToFile(overrides, paths) {
    if (overrides === void 0) { overrides = {}; }
    if (paths === void 0) { paths = defaultPaths; }
    paths = __assign(__assign({}, defaultPaths), paths);
    var prismaModels = extractModelsNames(paths.prismaSchemaPath);
    (0, writeFileSyncRecursive_1.writeFileSyncRecursive)(paths.outputPath, generateCaslSubjectsList(prismaModels, paths.prismaClientPath, overrides));
}
exports.generateCaslSubjectsToFile = generateCaslSubjectsToFile;
//# sourceMappingURL=index.js.map