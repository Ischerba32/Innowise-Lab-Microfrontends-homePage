const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
const webpack = require('webpack');
require('dotenv').config({ path: './.env' });

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "Innowise",
    projectName: "home",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    devServer: {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
      }
    },
    module: {
      rules: [
        {
          test: /\.(scss|css)$/i,
          include: /src/,
          exclude: /node_modules/,
          use: [
            {
              loader: require.resolve('style-loader', {
                paths: [require.resolve('webpack-config-single-spa-react-ts')],
              }),
            },
            {
              loader: require.resolve('css-loader', {
                paths: [require.resolve('webpack-config-single-spa-react-ts')],
              }),
            },
            {
              loader: require.resolve('sass-loader', {
                paths: [require.resolve('webpack-config-single-spa-react-ts')],
              }),
              options: {
                sourceMap: true,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env": JSON.stringify(process.env)
      }),
    ],
  });
};
