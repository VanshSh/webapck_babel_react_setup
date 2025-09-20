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

// Import PurgeCSSPlugin to remove unused CSS (commented out as not used currently)
import { PurgeCSSPlugin } from 'purgecss-webpack-plugin'

// Create __filename and __dirname equivalents for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// // Export the Webpack configuration object
// export default {

//   // Resolve these extensions automatically when importing modules
//   resolve: {
//     extensions: ['.js', '.jsx'],
//   },

//   // Configuration for the development server
//   devServer: {
//     // Serve static files from the 'public' directory
//     static: {
//       directory: path.join(__dirname, 'public'),
//     },
//     // Enable gzip compression for everything served
//     compress: true,
//     // Run the dev server on port 3000
//     port: 3000,
//     // Enable Hot Module Replacement for live reloading
//     hot: true,
//   },

//   // Plugins to extend Webpack's functionality
//   plugins: [
//     // Generate an HTML file from the template and inject the bundle
//     new HtmlWebpackPlugin({
//       template: './public/index.html',
//     }),
//   ],
// }

export default {
  // Entry point: the main JS file that kicks off your app
  entry: './src/index.js',
  // Output configuration: where to put the bundled files
  output: {
    filename: 'main.js',
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
        test: /\.css$ /,
        use: [MiniCssExtraPlugin.loader, 'css-loader'],
      },
    ],
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
  },

  //   // Resolve these extensions automatically when importing modules
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
    }),
    new MiniCssExtraPlugin({
      filename: 'index.css',
    }),
    new PurgeCSSPlugin({
      paths: ['./public/index.html'],
    }),
  ],
}
