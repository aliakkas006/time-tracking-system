import bcrypt from 'bcryptjs';

export const generateHash = async (payload, saltRound = 10) => {
  const salt = await bcrypt.genSalt(saltRound);
  return bcrypt.hash(payload, salt);
};

export const hashMatched = async (raw, hash) => {
  const result = await bcrypt.compare(raw, hash);
  return result;
};
