import { Container, Typography } from '@mui/material'
import React from 'react'
import FeedItems from './FeedItems'

const Feed = () => {
  return (
    <Container sx={{ marginTop: '6rem', minHeight: '90vh' }}>
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
        <Typography sx={{
          fontSize: '1.2rem',
          textAlign: 'center',
          marginBottom: '2rem',
          '@media (max-width: 442px)': {
            fontSize: '1rem',
          },
        }}>
            Selaa tekoälyyn liittyviä julkaisuja
        </Typography>
        <FeedItems />
    </Container>
  )
}

export default Feed