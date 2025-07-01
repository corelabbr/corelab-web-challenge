const js = require("@eslint/js");
const ts = require("typescript-eslint");
const react = require("eslint-plugin-react");
const reactHooks = require("eslint-plugin-react-hooks");
const reactRefresh = require("eslint-plugin-react-refresh");

module.exports = [
    js.configs.recommended,
    {
        ignores: [
            "dist",
            "vite.config.ts",
            "vitest.config.ts",
            "eslint.config.*",
        ],
        languageOptions: {
            parser: ts.parser,
            ecmaVersion: 2021,
            sourceType: "module",
            globals: {
                console: "readonly",
                localStorage: "readonly",
                document: "readonly",
                window: "readonly",
                React: "writable",
            },
        },
        plugins: {
            "@typescript-eslint": ts.plugin,
            react,
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
        },
        rules: {
            "no-undef": "off",
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": [
                "off",
                { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
            ],
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-unused-expressions": "warn",
            "@typescript-eslint/explicit-function-return-type": "off",
            "@typescript-eslint/no-non-null-assertion": "off",
            "@typescript-eslint/no-empty-function": "off",
            "react-refresh/only-export-components": [
                "warn",
                { allowConstantExport: true },
            ],
        },
    },
];
