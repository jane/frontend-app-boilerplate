import Koa from 'koa'
import Router from 'koa-router'
import cors from 'koa-cors'
import serve from 'koa-simple-static'
import bodyParser from 'koa-body-parser'
import { resolve } from 'path'
import open from 'zeelib/lib/open'
import { isProd } from './util'

const app = new Koa()
const router = new Router()

app.port = process.env.PORT || 8081
app.use(cors())
app.use(bodyParser())

const getAllPosts = () =>
  Promise.resolve([{ title: 'post one', text: 'i am the first post', id: 1 }])

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

const getPost = (id) =>
  Promise.resolve({
    id,
    title: 'i am the post you wanted',
    body: 'totally a real post',
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

const savePost = (body) => Promise.resolve(`totally saved post ${body.title}`)
router.post('/posts', async (ctx) => {
  try {
    console.dir(ctx, { colors: true })
    const res = await savePost(ctx.body)
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

router.get('*', async (ctx) => {
  ctx.body = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="shortcut icon" href="/favicon.ico">
    <title>Frontend Boilerplate</title>
  </head>
  <body>
    <main></main>
    <script src="${isProd ? '' : 'http://localhost:3000'}/bundle.js"></script>
  </body>
</html>
`
})

app.use(router.routes())

app.listen(app.port, () => {
  console.log(`Server listening on ${app.port}`)
  if (!isProd) {
    open('http://localhost:8081')
  }
})
