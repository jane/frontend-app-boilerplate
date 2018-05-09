import { isProd } from './util'

export default () => `
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
