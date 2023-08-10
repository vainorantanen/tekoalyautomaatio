import { Box, Typography } from '@mui/material'
import React from 'react'

const FeedHeader = () => {
  return (
    <Box>
        <Typography
        sx={{
          fontSize: '2.5rem',
          textAlign: 'center',
          '@media (max-width: 442px)': {
            fontSize: '1.5rem',
            marginBottom: '2rem'
          },
        }}
      >Tekoälyautomaatio.fi</Typography>
    </Box>
  )
}

export default FeedHeader