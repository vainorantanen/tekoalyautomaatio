import { Button, Container, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const LoginSuggestion = () => {
  return (
    <Container sx={{ marginTop: '8rem', minHeight: '100vh', textAlign: 'center', }}>
        <Typography
          sx={{
            fontSize: '1.3rem',
            '@media (max-width: 442px)': {
              fontSize: '1rem',
            },
          }}
        >
          Nähdäksesi tämän sivun, sinun täytyy kirjautua sisään.
        </Typography>
        <Button component={Link} to='/login'>Kirjaudu tai rekisteröidy</Button>
      </Container>
  )
}

export default LoginSuggestion