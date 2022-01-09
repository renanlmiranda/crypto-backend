import bcrypt from 'bcrypt';
import { sign, decode } from 'jsonwebtoken';
import { envs } from '../../config/envs';
import { iToken } from './login.types';

export default {
  compareHash: async (password: string, hashPwd: string) => {
    const compareHash = await bcrypt.compare(password, hashPwd);

    return compareHash;
  },

  generateToken: async id => {
    const exp = Math.floor(Date.now() / 1000) + envs.jwtTimeOut;
    const token = sign({ id, exp }, envs.jwtSecret);

    return token;
  },

  decodeToken: async (token: string): Promise<iToken> => decode(token),
};
