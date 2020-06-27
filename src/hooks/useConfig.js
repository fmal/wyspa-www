import { useStaticQuery, graphql } from 'gatsby';

const useConfig = () => {
  return useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            siteUrl
            author
          }
        }
      }
    `
  );
};

export default useConfig;
