const json = require('@rollup/plugin-json');
const serve = require('rollup-plugin-serve');
const livereload = require('rollup-plugin-livereload');
const copy = require('rollup-plugin-copy-glob');
const resolve = require('@rollup/plugin-node-resolve');
const postcss = require('rollup-plugin-postcss');
const postcssNested = require('postcss-nested');
const postcssImport = require('postcss-import');

const prod = !process.env.ROLLUP_WATCH;

export default [
  {
    input: 'site/index.js',
    output: {
      file: 'dist/index.js',
      format: 'iife',
      sourcemap: true
    },
    plugins: [
      resolve(),
      json(),
      !prod &&
        serve({
          contentBase: 'dist',
          port: 8080
        }),
      !prod && livereload({ watch: 'site' }),
      copy([{ files: 'site/**/!(*.js|*.css|.DS_Store)', dest: 'dist' }], { verbose: true, watch: !prod }),
      postcss({
        inject: false,
        extract: true,
        plugins: [postcssImport(), postcssNested()]
      })
    ],
    watch: {
      exclude: ['node_modules'] // jic
    }
  }
];
