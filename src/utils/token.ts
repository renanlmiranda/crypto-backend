import { sign, decode } from 'jsonwebtoken';
import { envs } from '../config/envs';

export default {
  generateToken: async (id: number): Promise<string> => {
    const token = sign({ id }, envs.jwtSecret, { expiresIn: envs.jwtTimeOut });

    return token;
  },

  decodeToken: async (token: string): Promise<string> => decode(token),
};
