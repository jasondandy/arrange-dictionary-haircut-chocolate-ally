// const path = require('path');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// module.exports = {
//   mode: 'production',
//   entry: {
//     main: './src/index.js',
//     styles: './src/sass/main.scss',
//   },
//   output: {
//     filename: '[name].js',
//     path: path.resolve(__dirname, 'dist'),
//   },
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         use: {
//           loader: 'babel-loader',
//           options: {
//             presets: ['@babel/preset-env', '@babel/preset-react'],
//           },
//         },
//       },
//       {
//         test: /\.scss$/,
//         use: [
//           {
//             loader: MiniCssExtractPlugin.loader,
//           },
//           'css-loader',
//           {
//             loader: 'postcss-loader',
//             options: {
//               postcssOptions: {
//                 plugins: [['autoprefixer']],
//               },
//             },
//           },
//           'sass-loader',
//         ],
//       },
//     ],
//   },
//   plugins: [
//     new MiniCssExtractPlugin({
//       filename: 'collage-gallery.min.css',
//     }),
//   ],
// };

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';

module.exports = {
  mode,
  entry: {
    main: './src/index.js',
    styles: './src/sass/main.scss',
  },
  output: {
    filename: (chunkData) => {
      return chunkData.chunk.name === 'main' ? 'collage-gallery-react.js' : '[name].js';
    },
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['autoprefixer']],
              },
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'collage-gallery.min.css',
    }),
  ],
  watchOptions: {
    ignored: /node_modules/,
  },
};
