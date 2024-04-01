const isDev = process.env.NODE_ENV === 'development'
console.log('isDev', isDev)
module.exports = {
  publicPath: './',
  outputDir: '../docs',
  transpileDependencies: [],
  lintOnSave: false
}
