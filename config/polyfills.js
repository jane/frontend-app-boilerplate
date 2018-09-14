if (typeof Promise === 'undefined') {
  require('promise/lib/rejection-tracking').enable()
  // eslint-disable-next-line no-undef
  window.Promise = require('promise/lib/es6-extensions.js')
}

require('whatwg-fetch')

Object.assign = require('object-assign')

if (process.env.NODE_ENV === 'test') {
  require('raf').polyfill(global)
}
