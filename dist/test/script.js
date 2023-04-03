"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const casl_prisma_generator_1 = require("casl-prisma-generator");
const overrides = {
    User: {
        typeName: 'JwtUser',
        importPath: "import { JwtUser } from 'test/auth-types';",
    },
    Post: null,
};
(0, casl_prisma_generator_1.generateCaslSubjectsToFile)('test/generated/subjectsList.ts', overrides, {
    prismaSchemaPath: 'test/prisma/schema.prisma',
});
//npm run test
//the result will be in: 'test/generated/subjectsList.ts' file
//# sourceMappingURL=script.js.map