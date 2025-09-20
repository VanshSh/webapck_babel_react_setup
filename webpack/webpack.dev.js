import { merge } from 'webpack-merge'
import common from './webpack.common.js'

export default merge(common, {
  mode: 'development',
  devServer: {
    hot: true,
    open: true,
    port: 3000,
  },
})
