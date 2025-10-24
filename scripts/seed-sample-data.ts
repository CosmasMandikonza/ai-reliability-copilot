import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const org = await prisma.org.upsert({
    where: { id: 'demo' },
    update: {},
    create: { id: 'demo', name: 'Demo Org' }
  });
  const user = await prisma.user.upsert({
    where: { email: 'founder@example.com' },
    update: {},
    create: { email: 'founder@example.com', name: 'Founder' }
  });
  await prisma.userOrgRole.upsert({
    where: { userId_orgId: { userId: user.id, orgId: org.id } },
    update: {},
    create: { userId: user.id, orgId: org.id, role: 'OWNER' }
  });
  await prisma.service.create({ data: { orgId: org.id, name: 'checkout', team: 'payments', sloTarget: 0.995 }});
  console.log('Seeded demo org/user/service.');
}
main().catch(e => (console.error(e), process.exit(1)));
