import Fastify from 'fastify';
import { PrismaClient } from '@prisma/client';

const app = Fastify({ logger: true });
const prisma = new PrismaClient();

app.get('/health', async () => ({ ok: true }));
app.get('/dbcheck', async () => {
  const orgs = await prisma.org.findMany({ take: 1 });
  return { ok: true, orgCount: orgs.length };
});

const port = Number(process.env.PORT ?? 8787);
app.listen({ port, host: '0.0.0.0' }).then(() => app.log.info('API on :' + port));
