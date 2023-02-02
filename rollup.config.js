const typescript = require('rollup-plugin-typescript2');
const terser     = require('@rollup/plugin-terser');

module.exports = {
    external: [ 'bootstrap' ],
    input   : './src/ts/BootstrapFormWizard.ts',
    output  : [
        {
            file   : './dist/js/bootstrap-form-wizard.js',
            esModule: true,
            format : 'umd',
            interop: 'compat',
            globals: {
                'bootstrap': 'bootstrap',
            },
            name     : 'BootstrapFormWizard',
            sourcemap: true,
        },
        {
            file   : './dist/js/bootstrap-form-wizard.min.js',
            esModule: true,
            format : 'umd',
            interop: 'compat',
            globals: {
                'bootstrap': 'bootstrap',
            },
            name     : 'BootstrapFormWizard',
            sourcemap: true,
            plugins: [
                terser({
                    format: {
                        comments: false
                    }
                })
            ]
        },
    ],
    plugins: [
        typescript({
            tsconfig: './tsconfig.json',
            useTsconfigDeclarationDir: true,
        })
    ]
}