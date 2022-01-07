import bcrypt from 'bcrypt';

export default {
  compareHash: async (password: string, hashPwd: string) => {
    const compareHash = await bcrypt.compare(password, hashPwd);

    return compareHash;
  },
};
