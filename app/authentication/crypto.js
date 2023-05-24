const crypto = require("crypto");

//encryption/hashing settings
const saltSize = 16;
const keySize = 64;
const ivSize = 16;
const tagSize = 16;
const scryptOptions = {
  N: 16384,
  r: 8,
  p: 1,
};
const secretKey = Buffer.from(process.env.SECRET_KEY, "base64");

/**
 * Gets a randomized salt for a new password
 */
getSalt = async () => {
  return new Promise((fulfill, reject) => {
    crypto.randomBytes(saltSize, (err, salt) => {
      if (err) reject(err);
      else fulfill(salt);
    });
  });
};

/**
 * Hashes the given password with the given salt
 */
hashPassword = async (password, salt) => {
  return new Promise((fulfill, reject) => {
    crypto.scrypt(password, salt, keySize, scryptOptions, (err, key) => {
      if (err) reject(err);
      else fulfill(key);
    });
  });
};

/**
 * Encryption the given JSON value
 */
encrypt = async (content) => {
  let str = JSON.stringify(content);
  let iv = crypto.randomBytes(ivSize);
  let cipher = crypto.createCipheriv("aes-256-gcm", secretKey, iv);
  let encrypted = Buffer.concat([cipher.update(str, "utf8"), cipher.final()]);
  let tag = cipher.getAuthTag();
  if (tag.length !== tagSize) throw new Error("Unexpected tag size");
  let buffer = Buffer.concat([iv, tag, encrypted]);
  return buffer.toString("base64");
};

/**
 * Decrypts the given token into a JSON value
 */
decrypt = async (token) => {
  try {
    let buffer = Buffer.from(token, "base64");
    let iv = buffer.slice(0, ivSize);
    let tag = buffer.slice(ivSize, ivSize + tagSize);
    if (iv.length !== ivSize || tag.length !== tagSize) throw null;
    let encrypted = buffer.slice(ivSize + tagSize);
    let decipher = crypto.createDecipheriv("aes-256-gcm", secretKey, iv);
    decipher.setAuthTag(tag);
    let str =
      decipher.update(encrypted, "binary", "utf8") + decipher.final("utf8");
    return JSON.parse(str);
  } catch {
    throw new Error({
      code: "invalid-auth",
      message: "Invalid authentication",
    });
  }
};

const cryptoUtils = {
  saltSize: saltSize,
  keySize: keySize,
  ivSize: ivSize,
  tagSize: tagSize,
  scryptOptions: scryptOptions,
  secretKey: secretKey,
  getSalt: getSalt,
  hashPassword: hashPassword,
  encrypt: encrypt,
  decrypt: decrypt,
};

module.exports = cryptoUtils;
