'use strict'

const fs = require('fs')
const path = require('path')
const http = require('http')

const Koa = require('koa')
const serveStatic = require('koa-static')
const logger = require('koa-logger')

const app = new Koa()

app.use(serveStatic(path.join(__dirname, './dist')))
app.use(logger())

http.createServer(app.callback()).listen(process.env.PORT || 8080)
