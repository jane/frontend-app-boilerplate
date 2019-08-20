import * as http from 'http'
import * as Koa from 'koa'
import * as Router from '@koa/router'
import * as lowercase from 'koa-lowercase'
import * as cors from 'koa-cors'
import * as serve from 'koa-simple-static'
import * as bodyParser from 'koa-bodyparser'
import { resolve } from 'path'
import { isProd } from './util'
import index from './layout'

const app = new Koa()
const router = new Router()
const port = process.env.PORT || 8081

app.use(cors())
app.use(bodyParser())
app.use(lowercase)

router.get('/data', async (ctx) => {
  try {
    const data = Array.from({ length: 20 }, (_, i) => `item ${i + 1}`)
    ctx.type = 'application/json'
    ctx.body = data
  } catch (err) {
    console.trace(err)
    ctx.status = 500
  }
})

app.use(
  serve({
    dir: resolve(__dirname, '..', '..', isProd ? 'build' : 'public'),
  })
)

router.get('*', (ctx) => {
  ctx.body = index()
})

app.use(router.routes())

const handler = app.callback()
const server = http.createServer((req, res) => {
  handler(req, res)
})

const main = () => {
  server.listen(port, () => {
    console.log(`boilerplate server listening on ${port}`)
  })

  process.on('SIGTERM', () => {
    server.close(() => {
      process.exit(0)
    })
  })
}

main()
