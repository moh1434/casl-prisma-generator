"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var casl_prisma_generator_1 = require("casl-prisma-generator");
var overrides = {
    User: {
        typeName: 'JwtUser',
        importPath: "import { JwtUser } from 'test/auth-types';",
    },
};
(0, casl_prisma_generator_1.generateCaslSubjectsToFile)('test/generated/subjectsList.ts', overrides, {
    prismaSchemaPath: 'test/prisma/schema.prisma',
});
//# sourceMappingURL=script.js.map