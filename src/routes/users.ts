import { Hono } from 'hono';
import { PrismaClient } from '../generated/prisma';
import { PrismaD1 } from '@prisma/adapter-d1';
import type { Env } from '../lib/env';

export const usersRoute = new Hono<{ Bindings: Env }>();

usersRoute.get('/', async (c) => {
	const prisma = new PrismaClient({ adapter: new PrismaD1(c.env.DB) });
	return c.json(await prisma.user.findMany());
});

usersRoute.get('/:id', async (c) => {
	const id = Number(c.req.param('id'));
	const prisma = new PrismaClient({ adapter: new PrismaD1(c.env.DB) });

	return c.json(
		await prisma.user.findUnique({
			where: { id },
		}),
	);
});
