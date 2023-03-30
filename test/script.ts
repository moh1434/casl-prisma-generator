import { generateCaslSubjectsToFile } from 'casl-prisma-generator';

const overrides = {
  User: {
    typeName: 'JwtUser',
    importPath: "import { JwtUser } from 'test/auth-types';",
  },
};

generateCaslSubjectsToFile('test/generated/subjectsList.ts', overrides, {
  prismaSchemaPath: 'test/prisma/schema.prisma',
});
//npm run test
//the result will be in: 'test/generated/subjectsList.ts' file
