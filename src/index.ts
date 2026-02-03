import { WorkerEntrypoint } from 'cloudflare:workers';

import { Hono } from 'hono';
// import { cors } from 'hono/cors';
// import type { Env } from './lib/env';

import { usersRoute } from './routes/users';
// import { notesRoute } from './routes/notes';

// const app = new Hono<{ Bindings: Env }>();
const app = new Hono().basePath('/api');
// app.use('*', cors());

// app.get('/', (c) => c.text('Hono!'));

// app.route('/api/users', usersRoute);
// app.route('/api/notes', notesRoute);

// export default app;

app.get('/', (c) => c.text('Hello from Hono'));

app.route('/users', usersRoute);

export default class extends WorkerEntrypoint {
	// HTTP / fetch 用（Hono に委譲）
	async fetch(req: Request): Promise<Response> {
		return app.fetch(req);
	}

	// RPC（Service Binding から直接呼ばれる）
	async add(a: number, b: number): Promise<number> {
		return a + b;
	}
}
