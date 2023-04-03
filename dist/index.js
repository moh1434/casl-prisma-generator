"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCaslSubjectsToFile = void 0;
const fs_1 = require("fs");
const writeFileSyncRecursive_1 = require("./writeFileSyncRecursive");
//
function extractModelsNames(prismaSchemaPath) {
    const schemaContent = (0, fs_1.readFileSync)(prismaSchemaPath).toString();
    const regex = /model\s+(\w+)\s+{/g;
    const matches = [];
    let match;
    while ((match = regex.exec(schemaContent)) !== null) {
        matches.push(match[1]);
    }
    return matches; //['User', 'Post', ...]
}
function generateCaslSubjectsList(models, prismaClientPath, overrides = {}) {
    for (const override of Object.keys(overrides)) {
        if (!models.includes(override)) {
            const error = `Override [${override}] is not in your prisma models`;
            console.error(error);
            throw new Error(error);
        }
    }
    //
    const customImports = [];
    const prismaImports = [];
    const content = ['export type SubjectsList = {'];
    models.map((model) => {
        if (model in overrides) {
            if (overrides[model] === null) {
                //exclude unWanted models
                return;
            }
            customImports.push(overrides[model].importPath);
            content.push(`  ${model}: ${overrides[model].typeName};`);
        }
        else {
            prismaImports.push(model);
            content.push(`  ${model}: ${model};`);
        }
    });
    content.push('};');
    const stringCustomImports = customImports.join('\n');
    const stringPrismaImportsNames = prismaImports.join(', ');
    const allPrismaImports = `import { ${stringPrismaImportsNames} } from '${prismaClientPath}';`;
    const result = "/** this file is auto generated, don't touch it **/\n\n" +
        allPrismaImports +
        '\n' +
        stringCustomImports +
        '\n\n' +
        content.join('\n') +
        '\n';
    return result;
}
const defaultPaths = {
    prismaSchemaPath: 'prisma/schema.prisma',
    prismaClientPath: '@prisma/client',
};
/**
 * @example
 * const overrides: OverrideSubjects = {
 *   User: {
 *     typeName: 'JwtUser',
 *     importPath: "import { JwtUser } from 'src/auth/types';",
 *   },
 *   Post: null,
 * };
 * generateCaslSubjectsToFile('generated/subjectsList.ts', overrides, {
 *   prismaSchemaPath: 'prisma/schema.prisma',
 *   prismaClientPath: '@prisma/client',
 * });
 * @example
 * generateCaslSubjectsToFile('generated/subjectsList.ts');
 */
function generateCaslSubjectsToFile(outputPath, overrides = {}, pathsConfig = defaultPaths) {
    const paths = Object.assign(Object.assign({}, defaultPaths), pathsConfig); //override default paths
    const prismaModels = extractModelsNames(paths.prismaSchemaPath);
    (0, writeFileSyncRecursive_1.writeFileSyncRecursive)(outputPath, generateCaslSubjectsList(prismaModels, paths.prismaClientPath, overrides));
}
exports.generateCaslSubjectsToFile = generateCaslSubjectsToFile;
//# sourceMappingURL=index.js.map