import bcrypt from 'bcrypt';

export default {
  createHash: async password => {
    const salt = await bcrypt.genSalt(10);
    const hashPwd = await bcrypt.hash(password, salt);

    return hashPwd;
  },
};
