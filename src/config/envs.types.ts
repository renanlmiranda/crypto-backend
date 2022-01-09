import { Secret } from 'jsonwebtoken';

export interface iEnvs {
  jwtSecret: Secret;
  jwtTimeOut: string;
}
