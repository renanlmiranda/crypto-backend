import bcrypt from 'bcrypt';

export default {
  compareHash: async (password: string, hashPwd: string) => {
    const compareHash = await bcrypt.compare(password, hashPwd);

    return compareHash;
  },

  createHash: async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    const hashPwd = await bcrypt.hash(password, salt);

    return hashPwd;
  },
};
