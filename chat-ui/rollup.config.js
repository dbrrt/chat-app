import typescript from 'rollup-plugin-typescript'
import sourceMaps from 'rollup-plugin-sourcemaps'
import commonjs from 'rollup-plugin-commonjs'
import { uglify } from 'rollup-plugin-uglify'
import external from 'rollup-plugin-peer-deps-external'
import filesize from 'rollup-plugin-filesize'
import resolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'
import scss from 'rollup-plugin-scss'

export default {
  input: './src/index.tsx',
  output: {
    name: 'bundle',
    file: './dist/bundle.js',
    format: 'cjs',
    sourcemap: true,
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify( 'production' )
    }),
    typescript(),
    scss(),
    external(),
    commonjs({
      include: ['node_modules/**'],
      namedExports: {
        'node_modules/react/index.js': [
          'Children',
          'Component',
          'PropTypes',
          'Fragment',
          'createElement'
        ],
        'node_modules/react-dom/index.js': [
          'render'
        ]
      }
    }),
    sourceMaps(),
    uglify(),
    filesize(),
    resolve({
      browser: true,
      main: true
    })
  ]
}
