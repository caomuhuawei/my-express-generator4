"use strict";
const crypto = require("crypto");
const key = Buffer.from('9vApxLk5G3PAsJrM', 'utf8');
const iv = Buffer.from('FnJL7EDzjqWjcaY9', 'utf8');

module.exports = {
  encrypted(password) {
    let sign = '';
    const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
    sign += cipher.update(password, 'utf8', 'hex');
    sign += cipher.final('hex');
    return sign;
  },
  decrypted(password) {
    let src = '';
    const cipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
    src += cipher.update(password, 'hex', 'utf8');
    src += cipher.final('utf8');
    return src;
  }
};
