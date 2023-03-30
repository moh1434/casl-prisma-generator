import { generateCaslSubjectsToFile } from 'casl-prisma-generator/generate';

const overrides = {
  User: {
    typeName: 'JwtUser',
    importPath: "import { JwtUser } from 'test/auth-types';",
  },
};

generateCaslSubjectsToFile(overrides, {
  prismaSchemaPath: 'test/prisma/schema.prisma',
  outputPath: 'test/generated/subjectsList.ts',
});
