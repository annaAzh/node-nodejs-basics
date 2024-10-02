import {readdir} from 'fs/promises';
import {fileURLToPath} from 'url';
import {dirname} from 'path';

const list = async () => {
    const fileName = fileURLToPath(import.meta.url);
    const __dirname = dirname(fileName);
    const errorMessage = 'FS operation failed';

    try {
        const pathToDir = __dirname + '/files/';
        await readdir(pathToDir).then((file) => {
            console.log(file);
        }).catch(() => {throw new Error(errorMessage)})
        
    } catch (error) {
        console.log(error)
    }
};

await list();