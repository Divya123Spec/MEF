const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;
const deps = require("./package.json").dependencies;
console.log('Running Webpack with ModuleFederationPlugin');
module.exports = {
  entry: path.resolve(__dirname, "src", "index.js"),
  mode: 'development',
  devServer: {
    static: {
      directory: path.resolve(__dirname, ".dist")
    },
    port: 3000,
    open: true,
    hot: true,
    historyApiFallback: true, 
    headers: {
      'Access-Control-Allow-Origin': '*', // Allow all origins (or specify your Angular app's domain)
    },
  },
  output: {
    path: path.resolve(__dirname, ".dist"),
    publicPath: "auto",
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, "src"),
        exclude: path.resolve(__dirname, "node_modules"),
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'reactMFE',
      filename: 'remoteEntry.js',
      exposes: {
        "./Sample": "./src/Sample.js", // Expose the Sample component
        './SampleMount': './src/SampleMount', 
      },
      remotes: {
        myAngularApp: 'myAngularApp@http://localhost:4200/remoteEntry.js', // URL of your Angular remote
      },
      shared: {
        ...deps,
        "react-dom": {
          singleton: true,
          eager:true,
          requiredVersion: 'auto' 
        },
        "zone.js": {
          singleton: true,  // Make sure zone.js is a singleton
          requiredVersion: 'auto',
          eager: true,
        },
        react: {
          singleton: true,
          eager: true,
          requiredVersion: 'auto'
        },
      
        
      },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"), // Ensure this file exists
    }),
  ],
};
