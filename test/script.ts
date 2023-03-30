import { generateCaslSubjectsToFile } from 'casl-prisma-generator';

const overrides = {
  User: {
    typeName: 'JwtUser',
    importPath: "import { JwtUser } from './../auth-types';",
  },
};

generateCaslSubjectsToFile(overrides, {
  prismaSchemaPath: 'test/prisma/schema.prisma',
  outputPath: 'test/generated/subjectsList.ts',
});
//npm run test
//the result will be in: 'test/generated/subjectsList.ts' file
