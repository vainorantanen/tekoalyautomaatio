import { Box, Typography } from '@mui/material'
import React from 'react'

const FeedHeader = () => {
  return (
    <Box>
        <Typography
        sx={{
          fontSize: '1.8rem',
          textAlign: 'center',
          marginBottom: '2rem',
          '@media (max-width: 442px)': {
            fontSize: '1.2rem',
          },
        }}
      >Avoimet tekoälyprojektit etsivät tekijöitä!</Typography>
    </Box>
  )
}

export default FeedHeader