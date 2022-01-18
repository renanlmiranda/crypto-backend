import { Role, Status } from '@prisma/client';

/* eslint-disable import/prefer-default-export */
export const BODY_TO_CREATE_USER = {
  role: Role.BASIC,
  status: Status.ACTIVE,
  created: new Date('2022-01-15'),
  deleted: null,
};

export const MOCK_TO_CREATE_USER = {
  name: 'Teste nome',
  lastName: 'Teste lastName',
  email: 'teste@teste.com.br',
  password: 'senhaTeste',
};

export const MOCK_TO_CREATE_USER_WITHOUT_EMAIL = {
  name: 'Teste nome',
  lastName: 'Teste lastName',
  email: '',
  password: 'senhaTeste',
};

export const MOCK_TO_CREATE_USER_WITHOUT_PASSWORD = {
  name: 'Teste nome',
  lastName: 'Teste lastName',
  email: 'teste@teste.com.br',
  password: '',
};
