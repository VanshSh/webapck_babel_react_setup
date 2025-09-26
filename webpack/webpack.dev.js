import { merge } from 'webpack-merge'
import common from './webpack.common.js'

export default merge(common, {
  mode: 'development',
  devtool: 'eval-source-map', //In the webpack configuration, the devtool property is used to specify the type of source map to generate. The value set for devtool determines the level of detail and the file format of the generated source map. Webpack recommends eval-source-map for development builds so that is what we are going to use

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
