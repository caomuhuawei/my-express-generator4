const validator = require("validator");

module.exports = {
  isEmpty(data) {
    return validator.isEmpty(data, { ignore_whitespace: true });
  },
};
