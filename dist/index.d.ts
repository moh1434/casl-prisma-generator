export type OverrideSubjects = {
    [key in string]: {
        typeName: string;
        importPath: string;
    };
};
declare const defaultPaths: {
    prismaSchemaPath: string;
    prismaClientPath: string;
};
export declare function generateCaslSubjectsToFile(outputPath: string, overrides?: OverrideSubjects, pathsConfig?: Partial<typeof defaultPaths>): void;
export {};
