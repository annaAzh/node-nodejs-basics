import { writeFile, stat } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const create = async () => {
    const fileName = fileURLToPath(import.meta.url);
    const __dirname = dirname(fileName);

    const fileContent = 'I am fresh and young';
    const errorMessage = 'FS operation failed';
    const newFilePath = join(__dirname, 'files', 'fresh.txt');

    try {
        const isExists = await stat(newFilePath).then(stat => stat.isFile()).catch(() => false);

        if (!isExists) {
            await writeFile(newFilePath, fileContent);
        } else {
            throw new Error(errorMessage)
        }
    } catch(error) {
        console.log(error)
    }
};

await create();