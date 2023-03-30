export type OverrideSubjects = {
    [key in string]: {
        typeName: string;
        importPath: string;
    };
};
declare const defaultPaths: {
    outputPath: string;
    prismaSchemaPath: string;
    prismaClientPath: string;
};
export declare function generateCaslSubjectsToFile(overrides?: OverrideSubjects, paths?: Partial<typeof defaultPaths>): void;
export {};
