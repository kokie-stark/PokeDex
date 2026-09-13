import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { env } from './env.js';
import { favoritesRoutes } from './routes/favorites.js';
import { pokemonRoutes } from './routes/pokemon.js';

const app = new Hono();

app.use(logger());
app.use(cors());

app.get('/', c => c.json({ ok: true }));
app.route('/pokemon', pokemonRoutes);
app.route('/favorites', favoritesRoutes);

serve({ fetch: app.fetch, port: env.PORT }, info => {
  console.log(`listening on http://localhost:${info.port}`);
});
