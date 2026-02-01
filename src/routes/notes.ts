import { Hono } from 'hono';
import { PrismaClient } from '../generated/prisma';
import { PrismaD1 } from '@prisma/adapter-d1';
import type { Env } from '../lib/env';
import type { CreateNoteRequest } from '../types/note';

export const notesRoute = new Hono<{ Bindings: Env }>();

notesRoute.get('/', async (c) => {
	const prisma = new PrismaClient({ adapter: new PrismaD1(c.env.DB) });
	return c.json(await prisma.note.findMany({ orderBy: { createdAt: 'desc' } }));
});

notesRoute.post('/', async (c) => {
	const body = await c.req.json<CreateNoteRequest>();

	if (!body.title) {
		return c.json({ error: 'title is required' }, 400);
	}

	const prisma = new PrismaClient({
		adapter: new PrismaD1(c.env.DB),
	});

	const note = await prisma.note.create({
		data: {
			title: body.title,
			content: body.content ?? '',
		},
	});

	return c.json(note, 201);
});
