import { readFileSync } from 'fs';

import { writeFileSyncRecursive } from './writeFileSyncRecursive';

export type OverrideSubjects = {
  [key in string]: { typeName: string; importPath: string } | null;
};
//

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
      if (overrides[model] === null) {
        //exclude unWanted models
        return;
      }
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
  const allPrismaImports = prismaImports.length
    ? `import { ${stringPrismaImportsNames} } from '${prismaClientPath}';`
    : '';

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

export function generateCaslSubjectsToFile(
  outputPath: string,
  overrides: OverrideSubjects = {},
  pathsConfig: Partial<typeof defaultPaths> = defaultPaths,
) {
  const paths = { ...defaultPaths, ...pathsConfig }; //override default paths

  const prismaModels = extractModelsNames(paths.prismaSchemaPath);
  writeFileSyncRecursive(
    outputPath,
    generateCaslSubjectsList(prismaModels, paths.prismaClientPath, overrides),
  );
}
