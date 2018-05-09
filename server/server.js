import Koa from 'koa'
import Router from 'koa-router'
import cors from 'koa-cors'
import serve from 'koa-simple-static'
import bodyParser from 'koa-body-parser'
import { resolve } from 'path'
import open from 'zeelib/lib/open'
import { isProd } from './util'
import pkg from '../package.json'
import index from './layout'
import {
  getAllPosts,
  getPost,
  savePost,
} from './mock-data'

const app = new Koa()
const router = new Router()

app.port = process.env.PORT || 8081
app.use(cors())
app.use(bodyParser())

router.get('/posts', async (ctx) => {
  try {
    const posts = await getAllPosts()
    ctx.type = 'application/json'
    ctx.body = posts
  } catch (err) {
    console.trace(err)
    ctx.status = 500
  }
})

router.get('/posts/:id', async (ctx) => {
  try {
    const post = await getPost(ctx.params.id)
    ctx.type = 'application/json'
    ctx.body = post
  } catch (err) {
    console.trace(err)
    ctx.status = 500
  }
})

router.post('/posts', async (ctx) => {
  try {
    const res = await savePost(ctx.request.body)
    ctx.body = res
  } catch (err) {
    console.trace(err)
    ctx.status = 500
  }
})

app.use(
  serve({
    dir: resolve(__dirname, '..', isProd ? 'build' : 'public'),
  })
)

router.get('*', (ctx) => {
  ctx.body = index()
})

app.use(router.routes())

app.listen(app.port, () => {
  console.log(`${pkg.name} server listening on ${app.port}`)
  if (!isProd) {
    open('http://localhost:8081')
  }
})
