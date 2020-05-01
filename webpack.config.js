const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  "mode": "production",
  "entry": "./src/index.js",
  "output": {
    "path": __dirname + '/static',
    "filename": "[name].[chunkhash:8].js"
  },
  "plugins": [new HtmlWebpackPlugin()],
  "devtool": "source-map",
  "module": {
    "rules": [
      {
        "enforce": "pre",
        "test": /\.(js|jsx)$/,
        "exclude": /node_modules/,
        "use": "eslint-loader"
      },
      {
        "test": /\.scss$/,
        "use": [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  }
};