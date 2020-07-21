const fs = require('fs');
const path = require('path');
const { tailwind } = require('@theme-ui/presets');

// load env variables
['.env', `.env.${process.env.NODE_ENV}`]
  .map(filename => path.resolve(__dirname, filename))
  .filter(filepath => fs.existsSync(filepath))
  .forEach(filepath => {
    require('dotenv').config({
      path: filepath
    });
  });

module.exports = {
  siteMetadata: {
    author: '@gatsbyjs',
    siteUrl: 'https://next.wyspa.iq.pl/'
  },
  plugins: [
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
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        defaultQuality: 70
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: tailwind.colors.white,
        theme_color: tailwind.colors.indigo[6],
        display: 'minimal-ui',
        icon: 'src/images/icon.png' // This path is relative to the root of the site.
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
                  excludeInSitemap
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
          allSitePage.edges
            .filter(({ node }) => node.context.excludeInSitemap === true)
            .map(({ node }) => {
              return {
                url: site.siteMetadata.siteUrl + node.path,
                changefreq: 'daily',
                priority: 0.7,
                links:
                  node.context.alternateLinks &&
                  node.context.alternateLinks.map(link => ({
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
