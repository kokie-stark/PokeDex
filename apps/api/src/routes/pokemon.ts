import { Hono } from 'hono';
import { supabaseAdmin } from '../supabase.js';

export const pokemonRoutes = new Hono();

const LIST_SELECT = 'id, name_ja, image_url';
const DETAIL_SELECT = `
  id, name_ja, height, weight, image_url,
  pokemon_types ( slot, types ( id, name_ja ) ),
  pokemon_abilities ( slot, is_hidden, abilities ( id, name_ja ) ),
  pokemon_stats ( base_stat, stats ( id, name_ja ) )
`;

pokemonRoutes.get('/', async c => {
  const page = Number(c.req.query('page') ?? '1');
  const limit = Number(c.req.query('limit') ?? '20');
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const {
    data,
    count,
    error,
  } = await supabaseAdmin.from('pokemon').select(LIST_SELECT, { count: 'exact' }).order('id').range(from, to);

  if (error) return c.json({ error: error.message }, 500);
  return c.json({ count, results: data });
});

pokemonRoutes.get('/search', async c => {
  const page = Number(c.req.query('page') ?? '1');
  const limit = Number(c.req.query('limit') ?? '20');
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  const name = c.req.query('name');
  const typeIds = (c.req.queries('type') ?? []).map(Number);

  let pokemonIds: number[] | null = null;

  if (typeIds.length > 0) {
    const { data: matches, error: typeError } = await supabaseAdmin
      .from('pokemon_types')
      .select('pokemon_id, type_id')
      .in('type_id', typeIds);
    if (typeError) return c.json({ error: typeError.message }, 500);

    const countByPokemonId = new Map<number, number>();
    for (const row of matches) {
      countByPokemonId.set(row.pokemon_id, (countByPokemonId.get(row.pokemon_id) ?? 0) + 1);
    }
    pokemonIds = [...countByPokemonId.entries()]
      .filter(([, count]) => count === typeIds.length)
      .map(([id]) => id);

    if (pokemonIds.length === 0) return c.json({ count: 0, results: [] });
  }

  let query = supabaseAdmin.from('pokemon').select(LIST_SELECT, { count: 'exact' });
  if (name) query = query.ilike('name_ja', `%${name}%`);
  if (pokemonIds) query = query.in('id', pokemonIds);

  const { data, count, error } = await query.order('id').range(from, to);
  if (error) return c.json({ error: error.message }, 500);
  return c.json({ count, results: data });
});

pokemonRoutes.get('/:id', async c => {
  const id = Number(c.req.param('id'));
  const { data, error } = await supabaseAdmin.from('pokemon').select(DETAIL_SELECT).eq('id', id).single();

  if (error) return c.json({ error: error.message }, 404);
  return c.json(data);
});
