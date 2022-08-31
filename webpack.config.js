const resolve = require.resolve

const config = {
  isDev: process.env.NODE_ENV === 'development',
  src: `${process.cwd()}/src`,
  dist: `${process.cwd()}/dist`,
  devServer: {
    port: 5200,
    host: 'localhost',
  }
}

module.exports = {
  mode: process.env.NODE_ENV,
  context: process.cwd(),
  devtool: config.isDev ? 'cheap-module-source-map' : false,
  devServer: config.devServer,
  entry: {
    entryMain: `${config.src}/entry/entryMain`,
    entry01: `${config.src}/entry/entry01`,
    entry02: `${config.src}/entry/entry02`,
    entry03: `${config.src}/entry/entry03`,
  },
  output: {
    path: config.dist,
    publicPath: config.isDev
      ? `http://${config.devServer.host}:${config.devServer.port}/`
      : '/dist/',
    filename: '[name].js',
    libraryTarget: 'window',
  },
  resolve: {
    modules: ['./node_modules', config.src],
    extensions: ['.js', '.json', '.jsx', '.scss', '.css'],
  },
  optimization: {
    emitOnErrors: false,
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        default: false,
        vendors: false,
        vendor: {
          name(module, chunks, cacheGroupKey) {
            const moduleFileName = module
              .identifier()
              .split('/')
              .reduceRight(item => item)
            const allChunksNames = chunks.map(item => item.name).join('-')
            return `${cacheGroupKey}.${allChunksNames}`
          },
          filename: config.isDev ? 'scripts/[name].js' : 'scripts/[name].js',
          chunks: 'all',
          test: /node_modules/,
          reuseExistingChunk: false,
        },
      },
    },
  },
}
