const fs = require('fs');
const path = require('path');

// load env variables
['.env', `.env.${process.env.NODE_ENV}`]
  .map(filename => path.resolve(__dirname, filename))
  .filter(filepath => fs.existsSync(filepath))
  .forEach(filepath => {
    require('dotenv').config({
      path: filepath
    });
  });

const resolveConfig = require('tailwindcss/resolveConfig');
const tailwindConfig = require('./tailwind.config.js');

const fullConfig = resolveConfig(tailwindConfig);

module.exports = {
  siteMetadata: {
    title: 'Instytut Sztuki Wyspa',
    description: 'Wyspa WWW.',
    author: '@gatsbyjs',
    siteUrl: 'https://next.wyspa.iq.pl/'
  },
  plugins: [
    'gatsby-plugin-postcss',
    {
      resolve: '@directus/gatsby-source-directus',
      options: {
        url: 'https://api.wyspa.iq.pl',
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
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        exclude: ['/404', '/*/404'],
        query: `
        {
          site {
            siteMetadata {
              siteUrl
            }
          }
          allSitePage {
            edges {
              node {
                path
                context {
                  alternateLinks {
                    language
                    path
                  }
                }
              }
            }
          }
      }`,
        serialize: ({ site, allSitePage }) =>
          allSitePage.edges.map(edge => {
            return {
              url: site.siteMetadata.siteUrl + edge.node.path,
              changefreq: 'daily',
              priority: 0.7,
              links:
                edge.node.context.alternateLinks &&
                edge.node.context.alternateLinks.map(link => ({
                  lang: link.language,
                  url: site.siteMetadata.siteUrl + link.path
                }))
            };
          })
      }
    },
    'gatsby-plugin-netlify'
  ]
};
