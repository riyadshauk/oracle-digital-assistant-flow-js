const { src, dest, series } = require('gulp');
const { createProject } = require('gulp-typescript');
const merge = require('merge2');
const webpack = require('webpack-stream');
const tsProject = createProject('tsconfig.json', { declaration: true }); // declaration is for creating d.ts files

/**
 * NOTE: adding `async` to this function will cause gulp to start `bundle` 
 * before `transpile` finishes, which fails the build
 */
const transpile = () => {
  const tsResult = tsProject.src().pipe(tsProject());
  return merge([ tsResult.js.pipe(dest('dist/js')), tsResult.dts.pipe(dest('dist/definitions')) ]);
};

const bundle = async () => (
  src('dist/js/lib.js')
    // @ts-ignore
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(dest('dist/'))
);

exports.default = series( transpile, bundle );