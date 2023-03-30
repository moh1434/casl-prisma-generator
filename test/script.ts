import { generateCaslSubjectsToFile } from 'casl-prisma-generator';

const overrides = {
  User: {
    typeName: 'JwtUser',
    importPath: "import { JwtUser } from 'src/auth/types';",
  },
};

generateCaslSubjectsToFile(overrides);
