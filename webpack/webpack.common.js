// Import the HtmlWebpackPlugin to generate HTML files and inject bundles
import HtmlWebpackPlugin from 'html-webpack-plugin'

// Import Node.js path utilities
import path, { dirname } from 'path'

// Import function to convert import.meta.url to a file path
import { fileURLToPath } from 'url'

// Import MiniCssExtractPlugin to extract CSS into separate files
import MiniCssExtraPlugin from 'mini-css-extract-plugin'

// Import TerserPlugin to minify JavaScript files
import TerserPlugin from 'terser-webpack-plugin'

// Import CssMinimizerPlugin to optimize and minimize CSS files
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'

// Import PurgeCSSPlugin to remove unused CSS
import { PurgeCSSPlugin } from 'purgecss-webpack-plugin'
import loader from 'sass-loader'

// Create __filename and __dirname equivalents for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default {
  // Entry point: the main JS file that kicks off your app
  entry: './src/index.js',
  // Output configuration: where to put the bundled files
  output: {
    clean: true, // Clean the output directory before each build
    filename: '[name].[contenthash].js', //This approach ensures users always get the latest version of your files after a deployment, while still benefiting from browser caching when files haven't changed. This is called "cache busting" and is a best practice for web performance and reliability.
    path: path.resolve(__dirname, '../dist'),
  },

  module: {
    rules: [
      {
        // Apply this rule to .js and .jsx files
        test: /\.(js|jsx)$/,
        // Exclude files in node_modules from being processed
        exclude: /node_modules/,
        // Use Babel loader to transpile JavaScript/JSX
        use: ['babel-loader'],
      },
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
      },
    ],
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
    //Imagine you have a big puzzle that you need to put together. The puzzle has different pieces, including a special guide that tells you how to put the puzzle together. In webpack, your application code is like the puzzle pieces, and the guide is like the runtime code that helps your application work properly.
    // By default, webpack puts the puzzle pieces and the guide together in each bundle it creates. But with `optimization.runtimeChunk`, we can separate the guide from the puzzle pieces and put it in its own bundle. This helps make things more organized and efficient.
    // So, by using `optimization.runtimeChunk`, we're telling webpack to separate the special guide (runtime code) from the puzzle pieces (application code), which helps with caching, faster updates, and overall performance of our React application.
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        //It is used in Webpack to optimize your bundle by splitting out third-party dependencies (from node_modules) into a separate file called vendors.js. Modern web apps often use large libraries (React, Lodash, etc.) from node_modules.
        // If all code (your app + libraries) is bundled together, any change in your code forces users to re-download the entire bundle, even if the libraries didn't change.
        // By splitting vendor code into a separate chunk, browsers can cache vendors.js longer, since it only changes when your dependencies change.
        vendor: {
          chunks: 'all',
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
        },
      },
    },
  },

  //   // Resolve these extensions automatically when importing modules
  resolve: {
    extensions: ['.ts', '.js', '.jsx', '.tsx'],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
    }),
    new MiniCssExtraPlugin({
      filename: '[name].[contenthash].css',
    }),
    // CSS Modules inherently solve the problem of unused CSS styles by scoping the styles to specific components or modules. This scoping ensures that only the CSS styles required for a particular component are included in the final bundle, eliminating the need for additional tools like PurgeCSS
    // new PurgeCSSPlugin({
    //   paths: ['./public/index.html'],
    // }),
  ],
}
