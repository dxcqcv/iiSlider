//process.traceDeprecation = true;
const path = require('path');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const BabiliPlugin = require('babili-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const DefinePlugin = require('webpack/lib/DefinePlugin');


// VARS
const NODE_ENV = process.env.NODE_ENV;

const ENV_DEVELOPMENT = NODE_ENV === 'development';
const ENV_PRODUCTION = NODE_ENV === 'production';

const HOST = 'localhost';
const PORT = '9988';

// LOADERS
const rules = {
  js: {
    test: /\.js?$/,
    use: [{
      loader: 'babel-loader',
      options: {
        plugins: [
          "transform-es2015-modules-commonjs",
          'transform-object-assign',
          'transform-es2015-destructuring',
          'transform-es2015-arrow-functions',
          'transform-es2015-spread',
          'transform-es2015-template-literals',
          'transform-es2015-shorthand-properties',
          'transform-object-set-prototype-of-to-assign',
        ],
      }
    }],
    exclude: /node_modules/,
  },
  html: {
    test: /\.pug$/,
    use: [ 'pug-loader' ],
    exclude: /node_modules/
  },
  css: {
    test: /\.(styl|css)/,
    exclude: /node_modules/,
    use: ['style-loader','css-loader', 'postcss-loader', 'stylus-loader']
  },
  
  json: {
    test: /\.json$/,
    use: ['json-loader'] 
  }
  
};

// CONFIG
const config = module.exports = {};

config.resolve = {
  extensions: ['.js', '.css', '.styl', '.pug', '.json'],
  mainFields: ['browser', 'module', 'main']
};

config.module = {
  rules: [
    rules.js,
    rules.html,
    rules.json
  ]
};

config.plugins = [
  new LoaderOptionsPlugin({
    debug: false,
    minimize: ENV_PRODUCTION,
    options: {
      postcss: [
        autoprefixer()
      ]
    }
  }),
  new HtmlWebpackPlugin({
    title: 'index',
    chunkSortMode: 'dependency',
    filename: path.resolve(__dirname, 'app/dist/index.html'),
    hash: false,
    alwaysWriteToDisk: true,
    inject: 'body',
    chunks: ['iiSlider'],
    template: path.resolve(__dirname, 'app/src/index.pug')
  }),
  new HtmlWebpackHarddiskPlugin(),

];

// DEVELOPMENT or PRODUCTION
if (ENV_DEVELOPMENT || ENV_PRODUCTION) {
  config.entry = {
    iiSlider:path.resolve(__dirname, 'app/src/js/iiSlider.js')
  };

  config.output = {
    path: path.join(__dirname, 'app/dist'),
    filename: 'js/[name].bundle.js'
  };

  config.plugins.push(
    new CommonsChunkPlugin({
      children: true,
      async: true
    })
  );
}

// DEVELOPMENT
if (ENV_DEVELOPMENT) {
  config.devtool = 'cheap-module-source-map';

  config.output.filename =  'js/[name].js';

  config.module.rules.push(rules.css);

  config.devServer = {
    contentBase: path.resolve(__dirname, 'app/dist'),
    historyApiFallback: true,
    inline: true,
    host: HOST,
    port: PORT,
    stats: {
      cached: true,
      cachedAssets: true,
      chunks: true,
      chunkModules: false,
      colors: true,
      hash: false,
      reasons: true,
      timings: true,
      version: false
    }
  };
}

// PRODUCTION 
if(ENV_PRODUCTION) {
  config.devtool = 'hidden-source-map';

  config.output.filename = 'js/[name].[chunkhash:8].js';

  config.module.rules.push({
    test: /\.(styl|css)/,
    include: path.join(__dirname,'app/src/css'),
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: ['css-loader', 'postcss-loader', 'stylus-loader']
    })
  });

  config.plugins.push(
    new CleanWebpackPlugin(['app/dist/js','app/dist/css']),
    new DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new ExtractTextPlugin({
      filename: 'css/[name].[chunkhash:8].css'
    }),
    new BabiliPlugin()
    //,new BundleAnalyzerPlugin()

  );
}
