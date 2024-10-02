import {readFile} from 'fs/promises';
import {fileURLToPath} from 'url';
import {dirname} from 'path';

const read = async () => {
    const fileName = fileURLToPath(import.meta.url);
    const __dirname = dirname(fileName);
    const errorMessage = 'FS operation failed';

    try {
        const pathToFile = __dirname + '/files/fileToRead.txt';
        await readFile(pathToFile).then((file) => {
            console.log(file.toString());
        }).catch(() => {throw new Error(errorMessage)})
        
    } catch (error) {
        console.log(error)
    }
};

await read();