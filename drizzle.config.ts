import { defineConfig } from 'drizzle-kit';

if (!process.env.HOMELAB_DATABASE_URL && !process.env.NEON_DATABASE_URL) {
	throw new Error('Both HOMELAB_DATABASE_URL and NEON_DATABASE_URL are not set');
}

export default defineConfig({
	schema: './src/lib/server/db/schema.ts',
	out: './src/lib/server/db/migrations',
	dialect: 'postgresql',
	dbCredentials: { url: process.env.HOMELAB_DATABASE_URL ?? process.env.NEON_DATABASE_URL! },
	verbose: true,
	strict: true
});
