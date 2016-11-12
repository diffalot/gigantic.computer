'use strict'

const fs = require('fs')
const path = require('path')
const http = require('http')
const https = require('https')

const Koa = require('koa')
const serveStatic = require('koa-static')
const logger = require('koa-logger')

const app = new Koa()

if (process.env.NODE_ENV === 'production') {
  const enforceHttps = require('koa-sslify')
  app.use(enforceHttps())
}

app.use(serveStatic(path.join(__dirname, './dist')))
app.use(logger())

if (process.env.NODE_ENV === 'production') {
  const ssl = {
    key: fs.readFileSync('certs/tls.key'),
    cert: fs.readFileSync('certs/tls.crt')
  }
  https.createServer(ssl, app.callback()).listen(443)
}

http.createServer(app.callback()).listen(process.env.PORT || 8080)
