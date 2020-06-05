import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Link to="/program/" className="text-blue-700">
      {'Zobacz program'}
    </Link>
  </Layout>
);

export default IndexPage;
