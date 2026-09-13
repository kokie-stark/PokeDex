import { createMiddleware } from 'hono/factory';
import { supabaseAnon } from '../supabase.js';

type AuthEnv = {
  Variables: {
    userId: string;
  };
};

// Verifies the Supabase-issued JWT sent as `Authorization: Bearer <token>` and
// resolves it to a real user id server-side — the client never gets to just claim a user_id.
export const requireAuth = createMiddleware<AuthEnv>(async (c, next) => {
  const authHeader = c.req.header('Authorization');
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice('Bearer '.length) : null;

  if (!token) {
    return c.json({ error: 'Missing Authorization header' }, 401);
  }

  const { data, error } = await supabaseAnon.auth.getUser(token);
  if (error || !data.user) {
    return c.json({ error: 'Invalid or expired token' }, 401);
  }

  c.set('userId', data.user.id);
  await next();
});
