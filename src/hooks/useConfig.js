import { useStaticQuery, graphql } from 'gatsby';

const useConfig = () => {
  return useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  );
};

export default useConfig;
