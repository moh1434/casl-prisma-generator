import {
  generateCaslSubjectsToFile,
  OverrideSubjects,
} from 'casl-prisma-generator';

const overrides: OverrideSubjects = {
  User: {
    typeName: 'JwtUser',
    importPath: "import { JwtUser } from 'test/auth-types';",
  },
  Post: null,
};

generateCaslSubjectsToFile(
  'test/generated/subjectsList.example.ts',
  overrides,
  {
    prismaSchemaPath: 'test/prisma/schema.prisma',
  },
);
//npm run test
//the result will be in: 'test/generated/subjectsList.ts' file
