import { Hono } from 'hono';
import { requireAuth } from '../middleware/auth.js';
import { supabaseAdmin } from '../supabase.js';

type FavoritesEnv = {
  Variables: {
    userId: string;
  };
};

export const favoritesRoutes = new Hono<FavoritesEnv>();

favoritesRoutes.use('*', requireAuth);

favoritesRoutes.get('/', async c => {
  const userId = c.get('userId');
  const { data, error } = await supabaseAdmin
    .from('favorites')
    .select('pokemon_id, created_at, pokemon ( id, name_ja, image_url )')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) return c.json({ error: error.message }, 500);
  return c.json(data);
});

favoritesRoutes.post('/', async c => {
  const userId = c.get('userId');
  const body = await c.req.json<{ pokemon_id?: number }>().catch(() => null);

  if (!body?.pokemon_id) {
    return c.json({ error: 'pokemon_id is required' }, 400);
  }

  const { error } = await supabaseAdmin
    .from('favorites')
    .insert({ user_id: userId, pokemon_id: body.pokemon_id });

  if (error) return c.json({ error: error.message }, 500);
  return c.json({ ok: true }, 201);
});

favoritesRoutes.delete('/:pokemonId', async c => {
  const userId = c.get('userId');
  const pokemonId = Number(c.req.param('pokemonId'));

  const { error } = await supabaseAdmin
    .from('favorites')
    .delete()
    .eq('user_id', userId)
    .eq('pokemon_id', pokemonId);

  if (error) return c.json({ error: error.message }, 500);
  return c.json({ ok: true });
});
