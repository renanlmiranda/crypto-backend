import { sign, decode } from 'jsonwebtoken';
import { envs } from '../config/envs';

export default {
  generateToken: async (id: number): Promise<string> => {
    const token = sign({ id }, envs.jwtSecret, { expiresIn: envs.jwtTimeOut });

    return token;
  },

  decodeToken: async (token: string): Promise<any> => {
    try {
      const response = await decode(token);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
};
