module.exports = {
    extends: ["airbnb-base"], // Do not change or follow other rule-sets
    env: {
        browser: true,
        webextensions: true,
        es6: true,
    },
    parser: "babel-eslint",
    parserOptions: {
        ecmaVersion: 6,
    },
    plugins: [
        "babel",
    ],
    settings: {
        "import/resolver": {
            node: {
                moduleDirectory: [
                    // Resolve root
                    "./",
                    // Resolve src
                    "./src",
                ],
            },
        }
    },
    rules: {
        "padded-blocks": 0,
        "indent": ["error", 4, { "SwitchCase": 1 }],
        "max-len": [2, 132],
        "eol-last": 0,

        // Typically this is not a runtime error even if defined before used but not in runtime
        "no-use-before-define": 0,

        // Yes we are the best to understand complex code as well even if airbnb not recommends
        //"no-nested-ternary": 0,

        "no-await-in-loop": 0,
        "no-continue": 0,

        "no-throw-literal": 0,
        "no-param-reassign": 0,

        //"import/prefer-default-export": 0,
    },
};
