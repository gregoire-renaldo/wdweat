process.env.NODE_ENV = process.env.NODE_ENV || 'production'

const environment = require('./environment')

// environment.plugins.prepend('env',
//   new webpack.DefinePlugin({
//     'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
//   })
// )

module.exports = environment.toWebpackConfig()
