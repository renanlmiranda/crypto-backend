/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line import/prefer-default-export
import { PrismaClient } from '@prisma/client';
import userService from './user.service';
import { iCreatedUser } from './user.types';

const prisma = new PrismaClient();

export const createUser = async ({
  password,
  name,
  last_name,
}): Promise<iCreatedUser> => {
  const passwordHash = await userService.createHash(password);
  const data = {
    password: passwordHash,
    name,
    last_name,
  };

  const user = await prisma.user.create({
    data,
  });

  return user;
};
