import { readFileSync } from 'fs';
import { resolve } from 'path';

import { writeFileSyncRecursive } from './writeFileSyncRecursive';

function extractModelsNames(prismaSchemaPath: string) {
  const schemaContent = readFileSync(prismaSchemaPath).toString();

  const regex = /model\s+(\w+)\s+{/g;
  const matches: string[] = [];
  let match;
  while ((match = regex.exec(schemaContent)) !== null) {
    matches.push(match[1]);
  }

  return matches; //['User', 'Post', ...]
}

export type OverrideSubjects = {
  [key in string]: { typeName: string; importPath: string };
};
function generateCaslSubjectsList(
  models: string[],
  prismaClientPath: string,
  overrides: OverrideSubjects = {},
) {
  for (const override of Object.keys(overrides)) {
    if (!models.includes(override)) {
      const error = `Override [${override}] is not in your prisma models`;
      console.error(error);
      throw new Error(error);
    }
  }

  //
  const customImports: string[] = [];
  const prismaImports: string[] = [];

  const content = ['export type SubjectsList = {'];
  models.map((model) => {
    if (model in overrides) {
      customImports.push(overrides[model].importPath);
      content.push(`  ${model}: ${overrides[model].typeName};`);
    } else {
      prismaImports.push(model);
      content.push(`  ${model}: ${model};`);
    }
  });
  content.push('};');

  const stringCustomImports = customImports.join('\n');
  const stringPrismaImportsNames = prismaImports.join(', ');
  const allPrismaImports = `import { ${stringPrismaImportsNames} } from '${prismaClientPath}';`;

  const result =
    "/** this file is auto generated, don't touch it **/\n\n" +
    allPrismaImports +
    '\n' +
    stringCustomImports +
    '\n\n' +
    content.join('\n') +
    '\n';

  return result;
}

const defaultPaths = {
  outputPath: resolve(__dirname, 'generated/subjectsList.ts'),
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
 * };
 * generateCaslSubjectsToFile(overrides, {
 *   outputPath: path.resolve(__dirname, 'generated/subjectsList.ts'),
 *   prismaSchemaPath: 'prisma/schema.prisma',
 *   prismaClientPath: '@prisma/client',
 * });
 * @example
 * generateCaslSubjectsToFile();
 *
 * @example
 * generateCaslSubjectsToFile({}, {
 *   outputPath: path.resolve(__dirname, 'generated/subjectsList.ts'),
 * });
 */
export function generateCaslSubjectsToFile(
  overrides: OverrideSubjects = {},
  pathsConfig: Partial<typeof defaultPaths> = defaultPaths,
) {
  const paths = { ...defaultPaths, ...pathsConfig }; //merge paths

  const prismaModels = extractModelsNames(paths.prismaSchemaPath);
  writeFileSyncRecursive(
    paths.outputPath,
    generateCaslSubjectsList(prismaModels, paths.prismaClientPath, overrides),
  );
}
