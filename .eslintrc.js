module.exports = {
  "extends": "eslint:recommended",
  "env": {
    "node": true,
    "es6": true,
  },
  "parserOptions": {
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
    }
  },
  "rules": {
    "indent": ["error", 2],
    "semi": ["error", "always"],
    "eqeqeq": ["warn", "always"],
    "no-var": "warn",
    "prefer-const": "warn",
    "prefer-template": "warn",
    "prefer-arrow-callback": ["warn", {allowUnboundThis: false}],
    "no-confusing-arrow": "warn",
    "no-useless-return": "warn",
    "no-global-assign": "off",
    "no-console": "off"
  }
};
