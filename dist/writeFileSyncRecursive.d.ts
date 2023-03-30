/// <reference types="node" />
/// <reference types="node" />
import * as fs from 'fs';
export declare function writeFileSyncRecursive(filePath: string, content: string | NodeJS.ArrayBufferView, charset?: fs.WriteFileOptions): void;
