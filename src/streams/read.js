import {createReadStream} from 'fs';
import {fileURLToPath} from 'url';
import {dirname, join} from 'path';

const read = async () => {
    
    const fileName = fileURLToPath(import.meta.url);
    const __dirname = dirname(fileName);
    const readStream = createReadStream(join(__dirname, 'files', 'fileToRead.txt'));
    readStream.pipe(process.stdout);
};

await read();