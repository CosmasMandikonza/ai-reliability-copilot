// apps/api/src/lib/rbac.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// ✅ plain string union, matches your enum values exactly
type Role = 'OWNER' | 'SRE' | 'VIEWER';

export async function assertOrgRole(
  userId: string,
  orgId: string,
  roles: Role[]
) {
  const r = await prisma.userOrgRole.findUnique({
    where: { userId_orgId: { userId, orgId } },
  });
  if (!r || !roles.includes(r.role as Role)) {
    const e = new Error('Forbidden');
    (e as any).statusCode = 403;
    throw e;
  }
}
