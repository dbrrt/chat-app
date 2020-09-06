import typescript from 'rollup-plugin-typescript'
import sourceMaps from 'rollup-plugin-sourcemaps'
import commonjs from 'rollup-plugin-commonjs'
// import { uglify } from 'rollup-plugin-uglify'
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
    resolve({
      browser: true,
      main: true
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify( 'production' )
    }),
    typescript(),
    scss(),
    external([ 'prop-types' ]),
    commonjs({
      include: [
        /node_modules/ 
      ],
      namedExports: {
        'node_modules/react/index.js': [
          'Children',
          'Component',
          'PropTypes',
          'Fragment',
          'createElement',
          'useLayoutEffect',
          'useEffect',
          'createContext',
          'useContext',
          'useMemo',
          'useState',
          'useRef',
          'useCallback'
        ],
        'node_modules/react-dom/index.js': [
          'render'
        ],
        'node_modules/socket.io-client/index.js': [],
        'node_modules/prop-types/index.js': [
          'array',
          'bool',
          'func',
          'number',
          'object',
          'string',
          'symbol',
          'any',
          'arrayOf',
          'element',
          'elementType',
          'instanceOf',
          'node',
          'objectOf',
          'oneOf',
          'oneOfType',
          'shape',
          'exact',
        ],
      }
    }),
    sourceMaps(),
    // uglify(),
    filesize()
  ]
}
