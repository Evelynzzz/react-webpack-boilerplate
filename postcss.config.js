module.exports = ({ env }) => ({
  plugins: {
    'autoprefixer': require('autoprefixer'),
    'cssnano': env === 'production' ? require('cssnano') : false
  }
})