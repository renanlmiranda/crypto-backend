import { Role, Status } from '@prisma/client';

/* eslint-disable import/prefer-default-export */
export const BODY_TO_CREATE_USER = {
  role: Role.BASIC,
  status: Status.ACTIVE,
  created: new Date('2022-01-15'),
  deleted: null,
};
