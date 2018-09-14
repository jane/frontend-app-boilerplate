const cluster = require('boring-cluster')
const pkg = require('../package.json')
const { resolve } = require('path')
const isProd = process.env.NODE_ENV === 'production'

require('@babel/register')({
  presets: [require('babel-preset-latest-minimal')],
  plugins: [require('@babel/plugin-proposal-object-rest-spread').default],
})

if (isProd) {
  cluster(resolve(__dirname, 'server.js'), { name: pkg.name })
} else {
  require('./server')
}
