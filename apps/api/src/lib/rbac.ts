import { PrismaClient, Role } from '@prisma/client';
const prisma = new PrismaClient();
export async function assertOrgRole(userId: string, orgId: string, roles: Role[]) {
  const r = await prisma.userOrgRole.findUnique({ where: { userId_orgId: { userId, orgId } } });
  if (!r || !roles.includes(r.role)) {
    const e = new Error('Forbidden');
    (e as any).statusCode = 403;
    throw e;
  }
}
