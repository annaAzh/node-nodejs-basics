import { rm } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const remove = async () => {
    const fileName = fileURLToPath(import.meta.url);
    const __dirname = dirname(fileName);
    const errorMessage = 'FS operation failed';

    try {
        const pathToFile = join(__dirname, 'files', 'fileToRemove.txt');

        await rm(pathToFile).catch(() => {
            throw new Error(errorMessage);
        })

    } catch (error) {
        console.log(error);
    }
};

await remove();