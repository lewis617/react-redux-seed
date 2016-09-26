module.exports = {
  styleLoader: require('extract-text-webpack-plugin')
    .extract({ fallbackLoader: 'style-loader', loader: 'css-loader!sass-loader' }),
  styles: {
    mixins: true,
    core: true,
    icons: true,
    larger: true,
    path: true,
    animated: true
  }
};
