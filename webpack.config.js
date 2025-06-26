// Import the HtmlWebpackPlugin to generate HTML files and inject bundles
import HtmlWebpackPlugin from 'html-webpack-plugin'

// Import Node.js path utilities
import path, { dirname } from 'path'

// Import function to convert import.meta.url to a file path
import { fileURLToPath } from 'url'

// Create __filename and __dirname equivalents for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Export the Webpack configuration object
export default {
  // Entry point: the main JS file that kicks off your app
  entry: './src/index.js',

  // Output configuration: where to put the bundled files
  output: {
    // Output directory (absolute path required)
    path: path.resolve(__dirname, 'dist'),
    // Name of the output bundle
    filename: 'bundle.js',
  },

  // Module rules: how to handle different file types
  module: {
    rules: [
      {
        // Apply this rule to .js and .jsx files
        test: /\.(js|jsx)$/,
        // Exclude files in node_modules from being processed
        exclude: /node_modules/,
        // Use Babel loader to transpile JavaScript/JSX
        use: 'babel-loader',
      },
    ],
  },

  // Resolve these extensions automatically when importing modules
  resolve: {
    extensions: ['.js', '.jsx'],
  },

  // Configuration for the development server
  devServer: {
    // Serve static files from the 'public' directory
    static: {
      directory: path.join(__dirname, 'public'),
    },
    // Enable gzip compression for everything served
    compress: true,
    // Run the dev server on port 3000
    port: 3000,
    // Enable Hot Module Replacement for live reloading
    hot: true,
  },

  // Plugins to extend Webpack's functionality
  plugins: [
    // Generate an HTML file from the template and inject the bundle
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
}
