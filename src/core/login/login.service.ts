import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import envs from '../../config/envs';

export default {
  compareHash: async (password: string, hashPwd: string) => {
    const compareHash = await bcrypt.compare(password, hashPwd);

    return compareHash;
  },

  generateToken: async id => {
    const token = jwt.sign({ id }, envs.jwtSecret, { expiresIn: 7200 });

    return token;
  },
};
