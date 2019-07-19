#!/usr/bin/env node

process.env.NODE_ENV = process.env.NODE_ENV || 'development'
console.log('--env--', process.env.NODE_ENV)

const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const httpProxyMiddleware = require('http-proxy-middleware')
const config = require('../config/webpack.config')
const paths = require('../config/paths')
const isPerf = process.env.NODE_ENV === 'performance'

const DEFAULT_PORT = process.env.PORT || process.env.VIRTUAL_PORT || 3000
let compiler
let handleCompile

const friendlySyntaxErrorLabel = 'Syntax error:'
const isLikelyASyntaxError = (message) =>
  message.indexOf(friendlySyntaxErrorLabel) !== -1

const setupCompiler = (port) => {
  compiler = webpack(config, handleCompile)
  compiler.plugin('invalid', () => {
    console.log('Compiling...')
  })

  compiler.plugin('done', (stats) => {
    const hasErrors = stats.hasErrors()
    const hasWarnings = stats.hasWarnings()
    if (!hasErrors && !hasWarnings) {
      console.log('Compiled successfully!')
      console.log('--env--', process.env.NODE_ENV)
      console.log(`Webpack running at localhost:${port}`)
    }

    const json = stats.toJson({}, true)
    let formattedErrors = json.errors.map((message) => `Error in ${message}`)
    const formattedWarnings = json.warnings.map(
      (message) => `Warning in ${message}`
    )
    if (hasErrors) {
      console.log('Failed to compile.')
      console.log()
      if (formattedErrors.some(isLikelyASyntaxError)) {
        formattedErrors = formattedErrors.filter(isLikelyASyntaxError)
      }
      formattedErrors.forEach((message) => {
        console.log(message)
        console.log()
      })
      return
    }
    if (hasWarnings) {
      console.log()
      formattedWarnings.forEach((message) => {
        console.log(message)
        console.log()
      })
    }
  })
}

const onProxyError = (proxy) => (err, req, res) => {
  const host = req.headers && req.headers.host
  console.log(
    `Proxy error: Could not proxy request ${req.url} from ${host} to ${proxy}.`
  )
  console.log(err.code)
  console.log(
    'See https://nodejs.org/api/errors.html#errors_common_system_errors for more information.'
  )
  console.log()

  if (res.writeHead && !res.headersSent) {
    res.writeHead(500)
  }
  res.end(
    `Proxy error: Could not proxy request ${req.url} from ${host} to ${proxy} (${err.code}).`
  )
}

const addMiddleware = (devServer) => {
  const proxy = require(paths.appPackageJson).proxy

  if (proxy) {
    if (typeof proxy !== 'string') {
      console.log('When specified, "proxy" in package.json must be a string.')
      console.log(`Instead, the type of "proxy" was "${typeof proxy}".`)
      console.log(
        'Either remove "proxy" from package.json, or make it a string.'
      )
      process.exit(1)
    }

    const mayProxy = /^(?!\/(.*\.hot-update\.json$|sockjs-node\/)).*$/
    devServer.use(
      mayProxy,
      httpProxyMiddleware((pathname) => mayProxy.test(pathname), {
        target: proxy,
        logLevel: 'silent',
        onError: onProxyError(proxy),
        secure: false,
        changeOrigin: false,
      })
    )
  }
  devServer.use(devServer.middleware)
}

const runDevServer = (port, protocol) => {
  const devServer = new WebpackDevServer(compiler, {
    clientLogLevel: 'none',
    contentBase: false,
    hot: !isPerf,
    publicPath: config.output.publicPath,
    quiet: true,
    watchOptions: {
      ignored: /node_modules/,
    },
    https: protocol === 'https',
    host: '0.0.0.0',
    overlay: false,
    disableHostCheck: true,
  })

  addMiddleware(devServer)

  devServer.listen(port, (err) => {
    if (err) {
      return console.log(err)
    }

    console.log('Starting the development server...')
    console.log()
  })
}

const run = (port) => {
  const protocol = process.env.HTTPS === 'true' ? 'https' : 'http'
  setupCompiler(port)
  runDevServer(port, protocol)
}

run(DEFAULT_PORT)
