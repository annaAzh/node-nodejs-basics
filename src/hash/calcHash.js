import {createHash} from 'crypto';
import {createReadStream} from 'fs';
import {fileURLToPath} from 'url';
import {dirname, join} from 'path';

const calculateHash = async () => {

    const fileName = fileURLToPath(import.meta.url);
    const __dirname = dirname(fileName);
    const filePath = join(__dirname, 'files', 'fileToCalculateHashFor.txt');

    const hash = createHash('sha256');
    const stream = createReadStream(filePath);

    stream.on('data', (data) => {
        hash.update(data);
    });
    
    stream.on('end', () => {
        console.log(hash.digest('hex'));
    });
};

await calculateHash();