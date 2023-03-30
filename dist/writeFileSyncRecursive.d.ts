/// <reference types="node" />
/// <reference types="node" />
import { WriteFileOptions } from 'fs';
export declare function writeFileSyncRecursive(filePath: string, content: string | NodeJS.ArrayBufferView, charset?: WriteFileOptions): void;
