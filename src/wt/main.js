import os from 'os';
import {Worker} from 'worker_threads';
import {fileURLToPath} from 'url';
import {dirname, join} from 'path';

const fileName = fileURLToPath(import.meta.url);
const __dirname = dirname(fileName);

const performCalculations = async () => {
    const cpus = os.cpus().length;
    let startCounter = 10;

    const workerPromises = [];

    for (let i = 0; i < cpus; i++) {
        workerPromises.push(new Promise((resolve, reject) => {
            const worker = new Worker(join(__dirname, 'worker.js'), {
                workerData: startCounter + i
            })
            worker.on('message', (result) => {
                resolve(result);
            })
            worker.on('error', (result) => {
                reject(result);
            })
        }))
    }

    const results = await Promise.all(workerPromises);
    results.forEach((result) => process.stdout.write(`${JSON.stringify(result)}\n`))

};

await performCalculations();