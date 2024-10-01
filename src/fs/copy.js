import {cp, access, constants} from 'fs/promises';
import {fileURLToPath} from 'url';
import {dirname} from 'path';

const isExistDirectory = async (path) => {
    return await access(path, constants.R_OK).then(() => true).catch(() => false);
}

const copy = async () => {
    const fileName = fileURLToPath(import.meta.url);
    const __dirname = dirname(fileName);

    try {
        const pathFrom = __dirname + '/files';
        const pathTo = __dirname + '/files_copy';
        const errorMessage = 'FS operation failed';

        const isExistsFrom = await isExistDirectory(pathFrom);
        const isExistsTo = await isExistDirectory(pathTo);

        if (!isExistsFrom || isExistsTo) {
            throw new Error(errorMessage);
        } else {
            cp(pathFrom, pathTo, {recursive: true});
        }

    } catch (error) {
        console.log(error)
    }

};

await copy();
