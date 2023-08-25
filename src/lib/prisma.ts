import { PrismaClient } from '@prisma/client';
import 'server-only';

declare global {
  var prismadb: PrismaClient | undefined;
}

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

const prisma = globalThis.prismadb || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalThis.prismadb = prisma;

export default prisma;
