-- Favorites: written only via the API server (service_role key bypasses RLS).
-- No policies are defined, so anon/authenticated clients get zero direct access.

CREATE TABLE favorites (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  pokemon_id INT NOT NULL REFERENCES pokemon(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, pokemon_id)
);

ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
