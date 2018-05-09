process.env.BABEL_ENV = 'development'
process.env.NODE_ENV = 'development'

process.on('unhandledRejection', (err) => {
  throw err
})

require('../config/env')

const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const {
  choosePort,
  createCompiler,
  prepareProxy,
  prepareUrls,
} = require('react-dev-utils/WebpackDevServerUtils')
const paths = require('../config/paths')
const config = require('../config/webpack.config')
const createDevServerConfig = require('../config/webpack-dev-server.config')

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000
const HOST = process.env.HOST || '0.0.0.0'

if (process.env.HOST) {
  console.log(
    `Attempting to bind to HOST environment variable: ${process.env.HOST}`
  )
}

choosePort(HOST, DEFAULT_PORT)
  .then((port) => {
    if (port == null) {
      return
    }
    const protocol = process.env.HTTPS === 'true' ? 'https' : 'http'
    const appName = require(paths.appPackageJson).name
    const urls = prepareUrls(protocol, HOST, port)
    const compiler = createCompiler(webpack, config, appName, urls, false)
    const proxySetting = require(paths.appPackageJson).proxy
    const proxyConfig = prepareProxy(proxySetting, paths.appPublic)
    const serverConfig = createDevServerConfig(
      proxyConfig,
      urls.lanUrlForConfig
    )
    const devServer = new WebpackDevServer(compiler, serverConfig)
    devServer.listen(port, HOST, (err) => {
      if (err) {
        return console.log(err)
      }
      console.log('Starting the development server...\n')
    })
    ;['SIGINT', 'SIGTERM'].forEach((sig) => {
      process.on(sig, () => {
        devServer.close()
        process.exit()
      })
    })
  })
  .catch((err) => {
    if (err && err.message) {
      console.log(err.message)
    }
    process.exit(1)
  })
