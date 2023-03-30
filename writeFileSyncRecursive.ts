import * as fs from 'fs';
import * as path from 'path';

export function writeFileSyncRecursive(
  filePath: string,
  content: string | NodeJS.ArrayBufferView,
  charset?: fs.WriteFileOptions,
) {
  fs.mkdirSync(path.dirname(filePath), {recursive: true})

  fs.writeFileSync(filePath, content, charset);
}
