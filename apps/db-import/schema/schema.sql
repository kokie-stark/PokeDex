-- PokeDex schema (Supabase / PostgreSQL)
-- Simplified from PokeAPI's CSV dump: Japanese-only names, base species (is_default) only.

CREATE TABLE pokemon (
  id INT PRIMARY KEY,          -- national dex number (pokeapi pokemon.id, is_default rows only)
  name_ja TEXT NOT NULL,
  height INT,                  -- decimetres, as in pokeapi
  weight INT,                  -- hectograms, as in pokeapi
  image_url TEXT                -- filled in later by the image upload step
);

CREATE TABLE types (
  id INT PRIMARY KEY,
  name_ja TEXT NOT NULL
);

CREATE TABLE pokemon_types (
  pokemon_id INT REFERENCES pokemon(id),
  type_id INT REFERENCES types(id),
  slot INT NOT NULL,
  PRIMARY KEY (pokemon_id, type_id)
);

CREATE TABLE abilities (
  id INT PRIMARY KEY,
  name_ja TEXT NOT NULL
);

CREATE TABLE pokemon_abilities (
  pokemon_id INT REFERENCES pokemon(id),
  ability_id INT REFERENCES abilities(id),
  is_hidden BOOLEAN NOT NULL DEFAULT FALSE,
  slot INT NOT NULL,
  PRIMARY KEY (pokemon_id, ability_id)
);

CREATE TABLE stats (
  id INT PRIMARY KEY,
  name_ja TEXT NOT NULL
);

CREATE TABLE pokemon_stats (
  pokemon_id INT REFERENCES pokemon(id),
  stat_id INT REFERENCES stats(id),
  base_stat INT NOT NULL,
  PRIMARY KEY (pokemon_id, stat_id)
);

-- Public read-only access: everyone (anon key) can SELECT, nobody can write via the API.
ALTER TABLE pokemon ENABLE ROW LEVEL SECURITY;
ALTER TABLE types ENABLE ROW LEVEL SECURITY;
ALTER TABLE pokemon_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE abilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE pokemon_abilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE pokemon_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read" ON pokemon FOR SELECT USING (true);
CREATE POLICY "public read" ON types FOR SELECT USING (true);
CREATE POLICY "public read" ON pokemon_types FOR SELECT USING (true);
CREATE POLICY "public read" ON abilities FOR SELECT USING (true);
CREATE POLICY "public read" ON pokemon_abilities FOR SELECT USING (true);
CREATE POLICY "public read" ON stats FOR SELECT USING (true);
CREATE POLICY "public read" ON pokemon_stats FOR SELECT USING (true);
