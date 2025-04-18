const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;
const deps = require("./package.json").dependencies;

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devServer: {
    port: 3001,
    open: true,
    hot: true,
  },
  output: {
    publicPath: 'auto',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
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
       
      },
      remotes: {
        myAngularApp: 'myAngularApp@http://localhost:4200/remoteEntry.js', // URL of your Angular remote
      },
      shared: {
        ...deps,
        "react-dom": {
          singleton: true,
          eager:true,
        },
        "zone.js": {
          singleton: true,  // Make sure zone.js is a singleton
          requiredVersion: 'auto',
          eager: true,
        },
        react: {
          singleton: true,
          eager: true,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
