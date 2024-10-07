import {pipeline} from 'stream/promises';
import {createReadStream, createWriteStream} from 'fs';
import {createGzip} from 'zlib';
import {fileURLToPath} from 'url';
import {dirname, join} from 'path';
const fileNameToConvert = 'fileToCompress.txt';
const fileNameConverted = 'archive.gz';

const compress = async () => {

    const fileName = fileURLToPath(import.meta.url);
    const __dirname = dirname(fileName);

    const gzip = createGzip();
    const readStream = createReadStream(join(__dirname, 'files', fileNameToConvert));
    const writeStream = createWriteStream(join(__dirname, 'files', fileNameConverted));

    try {
        await pipeline(readStream, gzip, writeStream);
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error(`File ${fileNameToConvert} not found`);
        } else {
            console.error(error);
        }
        process.exit(1);
    }
};

await compress();