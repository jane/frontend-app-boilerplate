/* eslint-disable node/no-deprecated-api */
const path = require('path')
const fs = require('fs')
const url = require('url')

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath)

const envPublicUrl = process.env.PUBLIC_URL

const ensureSlash = (path, needsSlash) => {
  const hasSlash = path.endsWith('/')
  if (hasSlash && !needsSlash) {
    return path.substr(path, path.length - 1)
  }
  if (!hasSlash && needsSlash) {
    return `${path}/`
  }
  return path
}

const getPublicUrl = (appPackageJson) =>
  envPublicUrl || require(appPackageJson).homepage

const getServedPath = (appPackageJson) => {
  const publicUrl = getPublicUrl(appPackageJson)
  const servedUrl =
    envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : '/')
  return ensureSlash(servedUrl, true)
}

module.exports = {
  appBuild: resolveApp('build'),
  appPublic: resolveApp('public'),
  appIndexJs: resolveApp('src/client/index.tsx'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src/client'),
  appNodeModules: resolveApp('node_modules'),
  publicUrl: getPublicUrl(resolveApp('package.json')),
  servedPath: getServedPath(resolveApp('package.json')),
}
