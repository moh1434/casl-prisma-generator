import { writeFileSync, mkdirSync, WriteFileOptions } from 'fs';

export function writeFileSyncRecursive(
  filePath: string,
  content: string | NodeJS.ArrayBufferView,
  charset?: WriteFileOptions,
) {
  const directoryPath = filePath.slice(0, filePath.lastIndexOf('/'));
  mkdirSync(directoryPath, { recursive: true });

  writeFileSync(filePath, content, charset);
}
