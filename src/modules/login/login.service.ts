import bcrypt from 'bcrypt';
import { sign, decode } from 'jsonwebtoken';
import { envs } from '../../config/envs';
import { iToken } from './login.types';

export default {
  generateToken: async (id: number) => {
    const token = sign({ id }, envs.jwtSecret, { expiresIn: envs.jwtTimeOut });

    return token;
  },

  decodeToken: async (token: string): Promise<iToken> => decode(token),
};
