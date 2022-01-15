/* eslint-disable import/prefer-default-export */
import { config } from 'dotenv';
import { iEnvs } from './envs.types';

config();

export const envs: iEnvs = {
  jwtSecret: process.env.JWT_SECRET,
  jwtTimeOut: process.env.JWT_TIMEOUT,
  port: process.env.PORT,
};
