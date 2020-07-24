/** @jsx jsx */
import { jsx, Box, Heading } from 'theme-ui';
import React from 'react';

const Section = React.forwardRef(({ sx, children, ...props }, ref) => {
  return (
    <Box
      ref={ref}
      as="section"
      sx={{
        mt: theme => [2, theme.sizes[6], null, theme.sizes[10]],
        ...sx
      }}
      {...props}
    >
      {children}
    </Box>
  );
});

Section.Heading = ({ sx, children, ...props }) => {
  return (
    <Heading
      as="h2"
      sx={{
        position: 'relative',
        pt: 3,
        fontSize: [2, 3, 4],
        mt: 0,
        mb: theme => [theme.sizes[6], null, null, 4],
        ...sx
      }}
      {...props}
    >
      <span
        sx={{
          position: 'absolute',
          top: 0,
          display: 'block',
          width: '1.675em',
          height: '0.125em',
          backgroundColor: 'currentColor'
        }}
      />
      {children}
    </Heading>
  );
};

export default Section;
