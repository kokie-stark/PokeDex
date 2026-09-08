import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readCsv, writeCsv } from './csv.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '../../..');
const SRC_DIR = path.join(REPO_ROOT, 'data-import/pokeapi/data/v2/csv');
const OUT_DIR = path.join(REPO_ROOT, 'data-import/output');

// local_language_id for Japanese kana display names (see languages.csv: id=1 -> ja-hrkt)
const JA_LANGUAGE_ID = '1';
// hp, attack, defense, special-attack, special-defense, speed — excludes accuracy/evasion (battle-only) and legacy gen1 "special"
const STAT_IDS = ['1', '2', '3', '4', '5', '6'];

const src = name => readCsv(path.join(SRC_DIR, `${name}.csv`));
const out = (name, headers, rows) => writeCsv(path.join(OUT_DIR, `${name}.csv`), headers, rows);

const buildJaNameMap = (rows, idKey) => {
  const map = new Map();
  for (const row of rows) {
    if (row.local_language_id === JA_LANGUAGE_ID) {
      map.set(row[idKey], row.name);
    }
  }
  return map;
};

// --- pokemon (default form only, i.e. one row per national dex entry) ---
const defaultPokemon = src('pokemon').filter(r => r.is_default === '1');
const defaultIds = new Set(defaultPokemon.map(r => r.id));
const speciesNameMap = buildJaNameMap(src('pokemon_species_names'), 'pokemon_species_id');

out(
  'pokemon',
  ['id', 'name_ja', 'height', 'weight', 'image_url'],
  defaultPokemon.map(r => ({
    id: r.id,
    name_ja: speciesNameMap.get(r.species_id) ?? '',
    height: r.height,
    weight: r.weight,
    image_url: '',
  })),
);

// --- types ---
const typeNameMap = buildJaNameMap(src('type_names'), 'type_id');
const typesAll = src('types').filter(r => typeNameMap.has(r.id));
const validTypeIds = new Set(typesAll.map(r => r.id));

out(
  'types',
  ['id', 'name_ja'],
  typesAll.map(r => ({ id: r.id, name_ja: typeNameMap.get(r.id) })),
);

out(
  'pokemon_types',
  ['pokemon_id', 'type_id', 'slot'],
  src('pokemon_types')
    .filter(r => defaultIds.has(r.pokemon_id) && validTypeIds.has(r.type_id))
    .map(r => ({ pokemon_id: r.pokemon_id, type_id: r.type_id, slot: r.slot })),
);

// --- abilities (main series only) ---
const abilityNameMap = buildJaNameMap(src('ability_names'), 'ability_id');
const abilitiesAll = src('abilities').filter(
  r => r.is_main_series === '1' && abilityNameMap.has(r.id),
);
const validAbilityIds = new Set(abilitiesAll.map(r => r.id));

out(
  'abilities',
  ['id', 'name_ja'],
  abilitiesAll.map(r => ({ id: r.id, name_ja: abilityNameMap.get(r.id) })),
);

out(
  'pokemon_abilities',
  ['pokemon_id', 'ability_id', 'is_hidden', 'slot'],
  src('pokemon_abilities')
    .filter(r => defaultIds.has(r.pokemon_id) && validAbilityIds.has(r.ability_id))
    .map(r => ({
      pokemon_id: r.pokemon_id,
      ability_id: r.ability_id,
      is_hidden: r.is_hidden,
      slot: r.slot,
    })),
);

// --- stats (the 6 main battle stats only) ---
const statNameMap = buildJaNameMap(src('stat_names'), 'stat_id');

out(
  'stats',
  ['id', 'name_ja'],
  STAT_IDS.map(id => ({ id, name_ja: statNameMap.get(id) })),
);

out(
  'pokemon_stats',
  ['pokemon_id', 'stat_id', 'base_stat'],
  src('pokemon_stats')
    .filter(r => defaultIds.has(r.pokemon_id) && STAT_IDS.includes(r.stat_id))
    .map(r => ({ pokemon_id: r.pokemon_id, stat_id: r.stat_id, base_stat: r.base_stat })),
);

console.log(`done. output written to ${OUT_DIR}`);
