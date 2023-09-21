const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',  
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // HtmlWebpackPlugin for generating HTML files
      new HtmlWebpackPlugin({
        template: './src/index.html', // Specify your HTML template file
      
      }),
// WebpackPwaManifest for generating the manifest file
      new WebpackPwaManifest({
        
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'A text editor that runs in the browser.',
        background_color: '#ffffff',
        theme_color: '#000000',
        start_url: '/',
				publicPath: '/',
        fingerprints: false,
        inject: true,
        icons: [
          {
            src: path.resolve('src/images/logo.png'), 
            sizes: [96, 128, 192, 256, 384, 512], 
            destination: path.join('assets','icons'),
          },
        ],
      }),

        new InjectManifest({
                swSrc: './src-sw.js',
                swDest: 'service-worker.js',
              }),  

      
     
    ],

    module: {
      rules: [
        
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },

      
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
