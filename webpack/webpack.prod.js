import { merge } from 'webpack-merge'
import TerserPlugin from 'terser-webpack-plugin'
import common from './webpack.common.js'

export default merge(common, {
  mode: 'production',
  devServer: {
    port: 3001,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                exportLocalsConvention: 'camelCase',
                localIdentName: '[hash:base64:5]',
              },
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
})
