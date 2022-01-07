/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line import/prefer-default-export
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createUser = async body => {
  const user = await prisma.user.create({ data: body });
  return user;
};
