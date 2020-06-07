require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
});

const resolveConfig = require('tailwindcss/resolveConfig');
const tailwindConfig = require('./tailwind.config.js');

const fullConfig = resolveConfig(tailwindConfig);

module.exports = {
  siteMetadata: {
    title: 'Instytut Sztuki Wyspa',
    description: 'Wyspa WWW.',
    author: '@gatsbyjs'
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        stages: ['build-javascript']
      }
    },
    'gatsby-plugin-postcss',
    {
      resolve: '@directus/gatsby-source-directus',
      options: {
        url: 'https://directus.wyspa.iq.pl',
        project: 'wyspa-www',
        auth: {
          token: process.env.DIRECTUS_API_TOKEN
        }
      }
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: fullConfig.theme.colors.white,
        theme_color: fullConfig.theme.colors.teal['400'],
        display: 'minimal-ui',
        icon: 'src/images/gatsby-icon.png' // This path is relative to the root of the site.
      }
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    'gatsby-plugin-netlify'
  ]
};
