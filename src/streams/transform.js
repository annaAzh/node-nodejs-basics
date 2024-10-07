import { Transform, pipeline } from 'stream';
import { promisify } from 'util';

const promisifiedPipeline = promisify(pipeline); 

const transform = async () => {
    const readable = process.stdin;
    const writable = process.stdout;

    const transformed = new Transform({
        transform(chunk, encoding, callback) {
            const chunkiStringified = Buffer.isBuffer(chunk) ? chunk.toString('utf-8') : chunk.toString(encoding); 
            this.push(chunkiStringified.trim().split('').reverse().join('') + '\n');
            callback();
        }
    })

    try {
        await promisifiedPipeline(readable, transformed, writable )
    } catch (error) {
        err => {console.log(err);
        process.exit(1)}
    }
};

await transform();