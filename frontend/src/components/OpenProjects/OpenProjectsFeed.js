import React from 'react'
import {
  Box,

} from '@mui/material'
import FeedItems from './FeedItems'
import FeedHeader from './FeedHeader'

const OpenProjectsFeed = () => {
  

  return (
    <Box sx={{ marginTop: '6rem', minHeight: '90vh' }}>
      <FeedHeader />
      <FeedItems />
    </Box>
  )
}

export default OpenProjectsFeed