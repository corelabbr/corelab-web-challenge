// eslint-disable-next-line @typescript-eslint/no-require-imports
const { FlatCompat } = require('@eslint/eslintrc')

const compat = new FlatCompat({
    baseDirectory: __dirname,
})

module.exports = [
    ...compat.plugins('react'),
    ...compat.config({
        plugins: ['react', '@typescript-eslint', 'eslint-plugin-import-helpers', 'prettier'],
        extends: [
            'plugin:react/recommended',
            'plugin:@typescript-eslint/recommended',
            'prettier',
            'plugin:prettier/recommended',
        ],
        env: {
            es2020: true,
            node: true,
        },
        rules: { 'react/react-in-jsx-scope': 'off' },
    }),
]
