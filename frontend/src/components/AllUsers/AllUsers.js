import React from 'react'

import { Container, Typography } from '@mui/material'
import AllUsersList from './AllUsersList'


const AllUsers = () => {
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
        <AllUsersList />
    </Container>
  )
}

export default AllUsers