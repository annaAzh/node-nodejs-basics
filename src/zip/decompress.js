import {pipeline} from 'stream/promises';
import {createReadStream, createWriteStream} from 'fs';
import {createGunzip} from 'zlib';
import {fileURLToPath} from 'url';
import {dirname, join} from 'path';
const fileNameToDecompress = 'archive.gz';
const fileNameDecompressed = 'fileToCompress.txt';


const decompress = async () => {
    const fileName = fileURLToPath(import.meta.url);
    const __dirname = dirname(fileName);

    const ungzip = createGunzip();
    const readStream = createReadStream(join(__dirname, 'files', fileNameToDecompress));
    const writeStream = createWriteStream(join(__dirname, 'files', fileNameDecompressed));

    try {
        await pipeline(readStream, ungzip, writeStream);
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error(`File ${fileNameToDecompress} not found`);
        } else {
            console.error(error);
        }
        process.exit(1);
    }
};

await decompress();