import React from 'react'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Box, TextField, Button, Typography } from '@mui/material'
import { useNotification } from '../hooks';
import forgotpasswordService from '../services/forgotpassword';

const ForgotPassword = () => {
    const [ email, setEmail ] = useState('')

    const notify = useNotification()

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
          const stat = await forgotpasswordService.create({ email })
          if (stat.Status === 'User not existed') {
            notify('Syöttämälläsi sähköpostilla ei löytynyt käyttäjiä', 'error')
            return 
          }
          setEmail('')
          notify('Sähköposti lähetetty onnistuneesti', 'success')
        } catch (e) {
          notify('Syöttämälläsi sähköpostilla ei löytynyt käyttäjiä', 'error')
        }
      }

  return (
    <Container sx={{ marginTop: '5rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '80vh',
    }}>
      <Box>
        <Typography sx={{
          fontSize: '2rem',
          textAlign: 'center',
          '@media (max-width: 442px)': {
            fontSize: '1.5rem',
          },
        }}>Unohdin salasanani</Typography>
        <Typography>Kirjoita sähköpostiosoitteesi, josta pääset alustamaan salasanasi</Typography>
      </Box>
      <Box component="form" onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: '2rem',
          marginBottom: '2rem',
          width: '100%',
          maxWidth: '30rem',
        }}
      >
        <TextField
          id="email"
          label="Sähköposti"
          type='email'
          required
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          sx={{ marginBottom: '1rem' }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ backgroundColor: 'blue', color: 'white',
            transition: 'transform 0.3s',
            marginTop: '1rem',
            marginBottom: '1rem',
            '&:hover': {
              transform: 'scale(1.05)',
              backgroundImage: 'linear-gradient(to bottom, #003eff, #006eff)' }
          }}
        >
          Lähetä
        </Button>
    </Box>
    </Container>
  )
}

export default ForgotPassword