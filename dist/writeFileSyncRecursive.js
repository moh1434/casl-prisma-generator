import { writeFileSync, mkdirSync } from 'fs';
import { dirname } from 'path';
export function writeFileSyncRecursive(filePath, content, charset) {
    mkdirSync(dirname(filePath), { recursive: true });
    writeFileSync(filePath, content, charset);
}
//# sourceMappingURL=writeFileSyncRecursive.js.map