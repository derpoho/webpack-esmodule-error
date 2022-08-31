const WebpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')
const webpackConfig = require('.//webpack.config')

const HOST = webpackConfig.devServer.host
const PORT = webpackConfig.devServer.port

const compiler = webpack(webpackConfig)
const server = new WebpackDevServer(
  {
    compress: true,
    hot: true,
    client: {
      overlay: true,
    },
    allowedHosts: 'all',
    host: HOST,
    port: PORT,
    static: {
      directory: `${webpackConfig.context}/dist`,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':
        'X-Requested-With, content-type, Authorization',
    },
  },
  compiler
)

server.listen(PORT, HOST, () => {
  console.log(`Dev Server running on http://${HOST}:${PORT}`)
  
})
