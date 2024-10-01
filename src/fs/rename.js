import {rename as fsRename} from 'fs/promises';
import {fileURLToPath} from 'url';
import {dirname} from 'path';

const rename = async () => {
    const fileName = fileURLToPath(import.meta.url);
    const __dirname = dirname(fileName);

    try {
        const pathToFile = __dirname + '/files/wrongFilename.txt';
        const pathToRename = __dirname + '/files/properFilename.md';
        const errorMessage = 'FS operation failed';

        await fsRename(pathToFile, pathToRename).catch(() => {
            throw new Error(errorMessage);
        });
        
    } catch (error) {
        console.log(error);
    }
    
};

await rename();