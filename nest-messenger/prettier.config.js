module.exports = {
    arrowParens: 'avoid',
    bracketSpacing: true,
    jsxBracketSameLine: false,
    printWidth: 100,
    proseWrap: 'never',
    semi: true,
    singleQuote: true,
    tabWidth: 4,
    trailingComma: 'es5',
    useTabs: false,
    endOfLine: 'lf',
    overrides: [
        {
            files: ['*.yml', '*.yaml', '*.json'],
            options: {
                tabWidth: 2,
            },
        },
    ],
};
