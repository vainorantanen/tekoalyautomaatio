import React from 'react';
import { Box, Typography } from '@mui/material';
import { Element } from 'react-scroll';
import AiWhy from './AiWhy';
import Sidebar from './Sidebar';
import AiHeader from './AiHeader';
import AiHow from './AiHow';

const AiInfo = () => {
  return (
    <Box sx={{ minHeight: '80vh', marginTop: '5rem' }}>
      <Typography
        sx={{
          fontSize: '2.5rem',
          textAlign: 'center',
          '@media (max-width: 442px)': {
            fontSize: '1.5rem',
            marginBottom: '2rem',
          },
        }}
      >
        Tekoäly osana liiketoimintaa
      </Typography>
      <AiHeader />
      <AiWhy />
      <AiHow />
    </Box>
  );
};

export default AiInfo;
