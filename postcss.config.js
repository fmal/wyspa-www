const cssnano = require('cssnano')({
  preset: 'default'
});

module.exports = () => ({
  plugins: [
    require('tailwindcss'),
    require('postcss-preset-env')({
      autoprefixer: true,
      stage: 3,
      features: {
        'custom-properties': {
          preserve: false
        }
      }
    }),
    ...(process.env.NODE_ENV === 'production' ? [cssnano] : [])
  ]
});
