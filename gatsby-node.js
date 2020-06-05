const path = require('path');

// graphql function doesn't throw an error so we have to check to check for the result.errors to throw manually
const wrapper = promise =>
  promise.then(result => {
    if (result.errors) {
      throw result.errors;
    }
    return result;
  });

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const response = await wrapper(
    graphql(`
      query EventsQuery {
        allDirectusEvent {
          edges {
            node {
              directusId
              slug
            }
          }
        }
      }
    `)
  );

  const {
    data: {
      allDirectusEvent: { edges: events = [] }
    }
  } = response;

  events.forEach(({ node: event }) => {
    createPage({
      path: `/program/${event.slug}`,
      component: path.resolve('./src/templates/event.js'),
      context: {
        directusId: event.directusId
      }
    });
  });
};
