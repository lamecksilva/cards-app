const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  // O webpack somente aceita arquivos .js e .json, e para aceitar
  // arquivos com outras extensões, se usa "loaders"
  module: {
    rules: [
      {
        // A propriedade 'test' identifica os arquivos que serão transformados
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        // E a propriedade 'use', indica qual "loader" o webpack vai usar para a
        // transformação dos arquivos
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    // Utilizamos o plugin do html para o Webpack produzir um .html ao final do bundle,
    // com nosso bundle .js em uma tag script dentro dele
    new HtmlWebPackPlugin({
      template: './src/index.html',
      // favicon: "./src/favicon.ico"
      filename: './index.html',
      minify: true,
    }),
  ],
  // Configurações do servidor de desenvolvimento
  devServer: {
    historyApiFallback: true,
    port: 3000,
    proxy: {
      '/api/**': {
        changeOrigin: true,
        target: 'http://localhost:9000/',
      },
    },
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
  },
};
