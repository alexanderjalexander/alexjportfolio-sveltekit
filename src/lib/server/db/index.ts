import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './migrations/schema';
import { HOMELAB_DATABASE_URL, NEON_DATABASE_URL } from '$app/env/private';

if (!HOMELAB_DATABASE_URL && !NEON_DATABASE_URL) {
	throw new Error('HOMELAB_DATABASE_URL and NEON_DATABASE_URL is not set');
}

const url = HOMELAB_DATABASE_URL || NEON_DATABASE_URL;

if (!url) {
	throw new Error('Set HOMELAB_DATABASE_URL or NEON_DATABASE_URL');
}

export const db = drizzle(postgres(url), { schema });
