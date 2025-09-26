import { merge } from 'webpack-merge'
import common from './webpack.common.js'

export default merge(common, {
  mode: 'development',

  devServer: {
    hot: true,
    open: true,
    port: 3000,
    static: ['./public'],
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtraPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                exportLocalsConvention: 'camelCase',
                localIdentName: '[path][name]__[local]',
              },
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
})
