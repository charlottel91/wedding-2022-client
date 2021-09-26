module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:prettier/recommended',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'no-use-before-define': 'off',
    'no-unused-vars': 'warn',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/jsx-filename-extension': [2, {extensions: ['.js', '.jsx']}],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
      },
    ],
    quotes: [2, 'single', {avoidEscape: true}],
    'max-len': [2, 90, 2, {ignoreUrls: true}],
  },
};
