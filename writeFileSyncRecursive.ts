import { writeFileSync, mkdirSync, WriteFileOptions } from 'fs';
import { dirname } from 'path';

export function writeFileSyncRecursive(
  filePath: string,
  content: string | NodeJS.ArrayBufferView,
  charset?: WriteFileOptions,
) {
  mkdirSync(dirname(filePath), { recursive: true });

  writeFileSync(filePath, content, charset);
}
