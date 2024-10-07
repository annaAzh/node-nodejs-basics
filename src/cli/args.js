import { argv } from 'node:process';

const parseArgs = () => {
    const result = [];
    let currentKey = null;

    argv.slice(2).forEach((arg) => {
        if (arg.startsWith('--') && !currentKey) {
            currentKey = arg;
        } else if (arg.startsWith('--') && currentKey) {
            result.push(`${currentKey.slice(2)} is undefined`);
            currentKey = arg;
        } else if (currentKey) {
            result.push(`${currentKey.slice(2)} is ${arg}`);
            currentKey = null;
        }
    });

    console.log(result.join(', '));
};

parseArgs();