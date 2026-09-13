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

pokemonRoutes.get('/:id', async c => {
  const id = Number(c.req.param('id'));
  const { data, error } = await supabaseAdmin.from('pokemon').select(DETAIL_SELECT).eq('id', id).single();

  if (error) return c.json({ error: error.message }, 404);
  return c.json(data);
});
