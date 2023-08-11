import { Container, Typography } from '@mui/material'
import React from 'react'
import FeedItems from './FeedItems'

const DevsList = () => {
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
            Kehittäjät
        </Typography>
        <Typography sx={{
          fontSize: '1.3rem',
          textAlign: 'center',
          marginBottom: '2rem',
          '@media (max-width: 442px)': {
            fontSize: '1rem',
          },
        }}>
            Selaa alustalla toimivia kehittäjiä
        </Typography>
        <FeedItems />
    </Container>
  )
}

export default DevsList