import { AES, enc } from "crypto-js";

const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;

export const textEncryption = (msg) => {
  if (!msg) return null;

  return AES?.encrypt(msg, SECRET_KEY)?.toString();
};

export const textDecryption = (cipherText) => {
  if (!cipherText) return null;

  return AES?.decrypt(cipherText, SECRET_KEY)?.toString(enc.Utf8);
};

export const objectEncryption = (msg) => {
  if (!msg) return null;

  return AES?.encrypt(JSON.stringify(msg), SECRET_KEY)?.toString();
};

export const objectDecryption = (cipherText) => {
  if (!cipherText) return null;

  return JSON?.parse(AES?.decrypt(cipherText, SECRET_KEY)?.toString(enc.Utf8));
};
