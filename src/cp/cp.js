import {spawn} from 'child_process';
import {fileURLToPath} from 'url';
import {dirname, join} from 'path';

const fileName = fileURLToPath(import.meta.url);
const __dirname = dirname(fileName);

const spawnChildProcess = async (args) => {
    const child = spawn('node',[join(__dirname, 'files', 'script.js'), args]);
    process.stdin.pipe(child.stdin);
    child.stdout.pipe(process.stdout);
};

spawnChildProcess(['someArgument1', 'someArgument2', 3]);
