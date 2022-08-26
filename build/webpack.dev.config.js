process.env.NODE_ENV = 'development';

const paths = require('./paths');
// const fs = require('fs');
// const cssLoader = require('css-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
// const _cssLoader = require('css-loader!style-loader?minimize!./main.css');
// const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
// const useTypeScript = fs.existsSync(paths.appTsConfig);
const cssRegex = /\.css$/i;
// const cssModuleRegex = /\.module\.css$/i;
// const sassRegex = /\.s(c|a)ss$/i;
// const sassModuleRegex = /\.module\.s(c|a)ss$/i;
const tsRegx = /\.(ts|tsx)?$/i;

const isEnvProduction = process.env.NODE_ENV === 'production';
const isEnvDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
  mode: isEnvProduction 
    ? 'production' 
    : isEnvDevelopment && 'development',
  // devTool: isEnvProduction 
  //   ? shouldUseSourceMap 
  //     ? 'source-map'
  //     : false
  //   : isEnvDevelopment && 'cheap-module-source-map',
  entry: paths.appIndexJs,
  output: {
    path: paths.appBuild,
    filename: isEnvProduction
      ? 'static/js/[name].[contenthash:8].js'
      : isEnvDevelopment && 'static/js/bundle.js',
    chunkFilename: isEnvProduction 
      ? 'static/js/[name].[contenthash:8].chunk.js'
      : isEnvDevelopment && 'static/js/[name].chunk.js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: cssRegex,
        use: [
          MiniCssExtractPlugin.loader, 
          'css-loader',
        ],
      },
      {
        test: tsRegx,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: isEnvProduction 
        ? 'css/[name].[contenthash:8].css' 
        : isEnvDevelopment && 'css/[name].css',
      chunkFilename: isEnvProduction 
        ? 'css/[name].[contenthash:8].css' 
        : isEnvDevelopment && 'css/[name].css',
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      inject: 'body',
    }),
  ],
  optimization: {
    minimize: isEnvProduction,
    minimizer: [
      new CssMinimizerWebpackPlugin(),
    ],
  }
};