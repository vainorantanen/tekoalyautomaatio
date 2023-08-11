import { Box, Typography } from '@mui/material'
import React from 'react'
import FeedItems from './FeedItems'

const Feed = () => {
  return (
    <Box sx={{ marginTop: '6rem', minHeight: '90vh' }}>
        <Typography sx={{
          fontSize: '1.8rem',
          textAlign: 'center',
          marginBottom: '2rem',
          '@media (max-width: 442px)': {
            fontSize: '1.3rem',
          },
        }}>
            Feed
        </Typography>
        <FeedItems />
    </Box>
  )
}

export default Feed