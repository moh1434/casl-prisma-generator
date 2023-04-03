export type OverrideSubjects = {
    [key in string]: {
        typeName: string;
        importPath: string;
    } | null;
};
declare const defaultPaths: {
    prismaSchemaPath: string;
    prismaClientPath: string;
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
export declare function generateCaslSubjectsToFile(outputPath: string, overrides?: OverrideSubjects, pathsConfig?: Partial<typeof defaultPaths>): void;
export {};
