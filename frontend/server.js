/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const config = require('./webpack.config.dev.js')
// const fs = require('fs')

const app = express()
const compiler = webpack(config)

/* body parsers */
// app.use(express.urlencoded({ extended: true }))
// app.use(express.json())

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
const middleWare = webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  // historyApiFallback: true,
})
app.use(middleWare)

// hot module replacement
app.use(
  require('webpack-hot-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
  }),
)

// app.get('/esbuild.wasm', (req, res) => {
//   const readStream = fs.createReadStream('./src/Components/esbuild.wasm')
//   res.writeHead(200, { 'Content-type': 'text/html' })
//   readStream.pipe(res)
// })

app.use('/public/', express.static('public'))

// Serve the files on port 3000.
app.listen(3000, () => {
  console.log('Example app listening on port 3000!\n')
})
