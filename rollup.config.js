const typescript = require('rollup-plugin-typescript2');
const terser     = require('@rollup/plugin-terser');

let bfwOutput = {
    compact : true,
    esModule: true,
    globals : {
        'bootstrap': 'bootstrap'
    },
    interop  : 'compat',
    name     : 'BootstrapFormWizard',
    sourcemap: true
};

module.exports = {
    external: [ 'bootstrap' ],
    input   : './src/ts/BootstrapFormWizard.ts',
    output  : [
        Object.assign({}, bfwOutput, {
            file  : './dist/js/bootstrap-form-wizard.esm.js',
            format: 'es',
        }),
        Object.assign({}, bfwOutput, {
            file   : './dist/js/bootstrap-form-wizard.esm.min.js',
            format : 'es',
            plugins: [
                terser({
                    format: {
                        comments: false
                    }
                })
            ]
        }),
        Object.assign({}, bfwOutput, {
            file   : './dist/js/bootstrap-form-wizard.js',
            format: 'umd',
        }),
        Object.assign({}, bfwOutput, {
            file   : './dist/js/bootstrap-form-wizard.min.js',
            format : 'umd',
            plugins: [
                terser({
                    format: {
                        comments: false
                    }
                })
            ]            
        })
    ],
    plugins: [
        typescript({
            useTsconfigDeclarationDir: true,
        })
    ]
}