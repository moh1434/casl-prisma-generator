import * as fs from 'fs';
import * as path from 'path';

function extractModelsNames(prismaSchemaPath) {
  const schemaContent = fs.readFileSync(prismaSchemaPath).toString();

  const regex = /model\s+(\w+)\s+{/g;
  const matches: string[] = [];
  let match;
  while ((match = regex.exec(schemaContent)) !== null) {
    matches.push(match[1]);
  }

  return matches; //['User', 'Post', ...]
}

export type OverrideModel = {
  [key in string]: { typeName: string; importPath: string };
};
function generateCaslSubjectsList(
  models: string[],
  prismaClientPath: string,
  overrides: OverrideModel = {},
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
  outputPath: path.resolve(__dirname, 'generated/subjectsList.ts'),
  prismaSchemaPath: 'prisma/schema.prisma',
  prismaClientPath: '@prisma/client',
};

/**
 * @example
 * generateCaslSubjectsToFile();
 *
 * @example
 * generateCaslSubjectsToFile({
 *   User: {
 *   typeName: 'JwtUser',
 *   importPath: "import { JwtUser } from 'src/auth/types';",
 *   },
 * }, {
 *   outputPath: path.resolve(__dirname, 'generated/subjectsList.ts'),
 *   prismaSchemaPath: 'prisma/schema.prisma',
 *   prismaClientPath: '@prisma/client',
 * });
 */
export function generateCaslSubjectsToFile(
  overrides: OverrideModel = {},
  paths: Partial<typeof defaultPaths> = defaultPaths,
) {
  paths = { ...defaultPaths, ...paths }; //merge paths

  const prismaModels = extractModelsNames(paths.prismaSchemaPath);
  fs.writeFileSync(
    paths.outputPath,
    generateCaslSubjectsList(prismaModels, paths.prismaClientPath, overrides),
  );
}
