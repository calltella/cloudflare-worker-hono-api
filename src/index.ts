import { PrismaClient } from './generated/prisma/';
import { PrismaD1 } from '@prisma/adapter-d1';
import type { Env } from './lib/env'
import { Hono } from 'hono';

const app = new Hono<{ Bindings: Env }>()

app.get('/api/users', async (c) => {
  const prisma = new PrismaClient({ adapter: new PrismaD1(c.env.DB) });
  return c.json(await prisma.user.findMany());
});

app.get('/api/users/:id', async (c) => {
  const id = c.req.param('id');
  const prisma = new PrismaClient({ adapter: new PrismaD1(c.env.DB) });
  return c.json(await prisma.user.findUnique({ where: { id: Number(id) } }));
});

export default app;
