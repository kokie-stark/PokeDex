import { createClient } from '@supabase/supabase-js';
import { env } from './env.js';

// Used only to validate a client-supplied JWT (auth.getUser). Never used for data access.
export const supabaseAnon = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);

// Bypasses RLS — the only client allowed to touch tables like `favorites`.
// Never send this key to the frontend.
export const supabaseAdmin = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
