import { WorkerEntrypoint } from 'cloudflare:workers';

// import { Hono } from 'hono';
// import { cors } from 'hono/cors';
// import type { Env } from './lib/env';

// import { usersRoute } from './routes/users';
// import { notesRoute } from './routes/notes';

// const app = new Hono<{ Bindings: Env }>();

// app.use('*', cors());

// app.get('/', (c) => c.text('Hono!'));

// app.route('/api/users', usersRoute);
// app.route('/api/notes', notesRoute);

// export default app;

export default class extends WorkerEntrypoint {
	async fetch(req: Request): Promise<Response> {
		return new Response('Hello from B');
	}

	async add(a: number, b: number): Promise<number> {
		return a + b;
	}
}
