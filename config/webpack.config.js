const path = require('path')
const webpack = require('webpack')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin')
const getClientEnvironment = require('./env')
const paths = require('./paths')

const isProd = process.env.NODE_ENV === 'production'
const keep = (xs) => xs.filter(Boolean)
const publicPath = isProd ? paths.servedPath : '/'
const publicUrl = isProd ? publicPath.slice(0, -1) : ''
const env = getClientEnvironment(publicUrl)

const babelConfig = {
  presets: [
    '@babel/preset-react',
    '@babel/preset-typescript',
    '@babel/preset-env',
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    'styled-components',
    'styled-name',
  ],
  compact: isProd,
  cacheDirectory: !isProd,
}

module.exports = {
  bail: true,
  mode: isProd ? 'production' : 'development',
  devtool: isProd ? 'source-map' : 'cheap-module-source-map',
  entry: keep([
    require.resolve('@babel/polyfill'),
    require.resolve('./polyfills'),
    !isProd && require.resolve('react-dev-utils/webpackHotDevClient'),
    paths.appIndexJs,
  ]),
  output: {
    pathinfo: !isProd,
    path: paths.appBuild,
    filename: 'bundle.js',
    // isProd ? 'static/js/[name].[chunkhash:8].js' : 'static/js/bundle.js',
    chunkFilename: '[name].js',
    // isProd ? 'static/js/[name].[chunkhash:8].chunk.js' : 'static/js/[name].chunk.js',
    publicPath: publicPath,
    devtoolModuleFilenameTemplate: (info) =>
      isProd
        ? path.relative(paths.appSrc, info.absoluteResourcePath)
        : path.resolve(info.absoluteResourcePath),
  },
  resolve: {
    modules: ['node_modules', paths.appNodeModules].concat(
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
    ),
    extensions: ['.js', '.json', '.ts', '.tsx'],
    plugins: [new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson])],
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.tsx?$/,
        include: paths.appSrc,
        loader: require.resolve('babel-loader'),
        options: babelConfig,
      },
    ],
  },
  optimization: {
    splitChunks: false, // isProd ? { add config here } : false,
    minimizer: keep([
      isProd &&
        new UglifyJsPlugin({
          uglifyOptions: {
            output: { ascii_only: true },
            ie8: false,
            safari10: true,
          },
          sourceMap: true,
          parallel: true,
        }),
    ]),
  },
  plugins: keep([
    new webpack.DefinePlugin(env.stringified),
    !isProd && new webpack.NamedModulesPlugin(),
    !isProd && new CaseSensitivePathsPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ]),
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  performance: {
    hints: isProd ? 'warning' : false,
  },
}
