import {createWriteStream} from 'fs';
import {fileURLToPath} from 'url';
import {dirname, join} from 'path';

const write = async () => {
    const fileName = fileURLToPath(import.meta.url);
    const __dirname = dirname(fileName);
    const writeStream = createWriteStream(join(__dirname, 'files', 'fileToWrite.txt'));
    process.stdin.pipe(writeStream);
};

await write();