import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFileSync } from 'node:fs';
import { Storage } from '@google-cloud/storage';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '../../..');
const POKEMON_CSV = path.join(REPO_ROOT, 'data-import/output/pokemon.csv');
const SPRITES_DIR = path.join(REPO_ROOT, 'data-import/sprites/sprites/pokemon');

const BUCKET_NAME = process.env.GCS_BUCKET ?? 'pokemon-images-pokedex-509211';
const CONCURRENCY = 20;

const ids = readFileSync(POKEMON_CSV, 'utf-8')
  .trim()
  .split('\n')
  .slice(1) // skip header
  .map(line => line.split(',')[0]);

const storage = new Storage();
const bucket = storage.bucket(BUCKET_NAME);

const uploadOne = async id => {
  const localPath = path.join(SPRITES_DIR, `${id}.png`);
  await bucket.upload(localPath, { destination: `pokemon/${id}.png` });
};

const runInBatches = async (items, worker, size) => {
  let done = 0;
  for (let i = 0; i < items.length; i += size) {
    const batch = items.slice(i, i + size);
    await Promise.all(batch.map(worker));
    done += batch.length;
    console.log(`${done}/${items.length} uploaded`);
  }
};

await runInBatches(ids, uploadOne, CONCURRENCY);

console.log(`done. uploaded ${ids.length} images to gs://${BUCKET_NAME}/pokemon/`);
