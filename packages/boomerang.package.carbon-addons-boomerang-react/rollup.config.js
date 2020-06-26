import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';
import filesize from 'rollup-plugin-filesize';
import postcss from 'rollup-plugin-postcss';
import copy from 'rollup-plugin-copy';
import external from 'rollup-plugin-peer-deps-external';
import autoprefixer from 'autoprefixer';
import json from 'rollup-plugin-json';
import packageJson from './package.json';

process.env.NODE_ENV = 'production';
const prodSettings = [terser(), filesize()];

const stripBanner = require('rollup-plugin-strip-banner');

const baseConfig = {
  input: './src/index.js',
  plugins: [
    babel({
      babelrc: false,
      runtimeHelpers: true,
      exclude: ['node_modules/**'],
      presets: ['@babel/preset-env', '@babel/preset-react', 'react-app'],
    }),
    external(),
    resolve({
      browser: true,
      extensions: ['.mjs', '.js', '.jsx', '.json'],
    }),

    commonjs({
      include: /node_modules/,
      namedExports: {
        '@stomp/stompjs/bundles/stomp.umd.js': ['Client'],
        'carbon-components-react/lib/components/ComposedModal/index.js': [
          'ModalHeader',
          'ModalBody',
          'ModalFooter',
        ],
        'carbon-components-react/lib/components/UIShell/index.js': [
          'Header',
          'HeaderName',
          'HeaderMenu',
          'HeaderMenuButton',
          'HeaderGlobalBar',
          'HeaderGlobalAction',
          'SkipToContent',
          'HeaderMenuItem',
          'HeaderNavigation',
          'HeaderPanel',
          'SideNav',
          'SideNavItems',
          'SideNavLink',
          'SideNavMenu',
          'SideNavMenuItem',
          'SideNavFooter',
        ],
        'react/index.js': [
          'Children',
          'Component',
          'PureComponent',
          'Fragment',
          'PropTypes',
          'createElement',
        ],
        'react-dom/index.js': ['render'],
        'node_modules/react-is/index.js': ['isForwardRef', 'isValidElementType'],
        'scheduler/index.js': ['unstable_runWithPriority', 'LowPriority'],
        'node_modules/formik/node_modules/scheduler/index.js': [
          'unstable_runWithPriority',
          'LowPriority',
        ],
      },
    }),
    postcss({
      extract: 'styles/css/carbon-addons-boomerang-react.css',
      sourceMap: true,
      use: ['sass'],
      plugins: [autoprefixer],
    }),
    copy({
      flatten: false,
      targets: [
        // Sass components
        {
          src: ['src/**/*.scss'],
          dest: 'styles/scss',
        },
      ],
      verbose: true,
    }),
    stripBanner(),
    json({
      // All JSON files will be parsed by default,
      // but you can also specifically include/exclude files
      exclude: ['node_modules'],

      // for tree-shaking, properties will be declared as
      // variables, using either `var` or `const`
      preferConst: true, // Default: false

      // specify indentation for the generated default export —
      // defaults to '\t'
      indent: '  ',

      // ignores indent and generates the smallest code
      compact: true, // Default: false

      // generate a named export for every property of the JSON object
      namedExports: true, // Default: true
    }),
    ...prodSettings,
  ],
};

const umdExternalDependencies = Object.keys(packageJson.peerDependencies).filter(
  (dependency) =>
    dependency !== 'carbon-components' &&
    dependency !== 'carbon-components-react' &&
    dependency !== 'react-router-dom'
);

const umdBundleConfig = {
  input: baseConfig.input,
  external: [...umdExternalDependencies, 'prop-types'],
  output: {
    name: 'CarbonAddonsBoomerangReact',
    format: 'umd',
    globals: {
      classnames: 'classNames',
      'prop-types': 'PropTypes',
      react: 'React',
      'react-dom': 'ReactDOM',
      'carbon-icons': 'CarbonIcons',
      'react-router-dom': 'reactRouterDom',
    },
  },
};

module.exports = [
  // Generates the following bundles:
  // ESM:       es/index.js
  // CommonJS: lib/index.js
  {
    ...baseConfig,
    plugins: [...baseConfig.plugins],
    output: [
      {
        format: 'esm',
        file: 'es/index.js',
      },
      {
        format: 'cjs',
        file: 'lib/index.js',
      },
    ],
  },

  // Generate the production UMD bundle:
  // UMD: umd/carbon-addons-boomerang-react.min.js
  {
    ...umdBundleConfig,
    plugins: [
      ...baseConfig.plugins,
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      terser(),
    ],
    output: {
      ...umdBundleConfig.output,
      file: 'umd/carbon-addons-boomerang-react.min.js',
    },
  },
];
