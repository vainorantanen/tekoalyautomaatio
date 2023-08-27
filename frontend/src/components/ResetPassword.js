import React from 'react'
import { Container, Box, TextField, Button, Typography, InputAdornment, } from '@mui/material'
import { useNotification } from '../hooks';
import { useState } from "react";
import resetpasswordService from '../services/resetpassword';
import { useParams } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const ResetPassword = () => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const {id, token} = useParams()

    const notify = useNotification()

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (password !== confirmPassword) {
            notify('Salasanat eivät täsmää!', 'error')
            return
          }

        try {
          const stat = await resetpasswordService.create({ id, token, password })
          if (stat.Status !== 'Success') {
            notify('Ilmeni jokin ongelma', 'error')
            return
          }
          setPassword('')
          setConfirmPassword('')
          notify('Salasana päivitetty onnistuneesti', 'success')
        } catch (e) {
          notify('Ilmeni jokin ongelma', 'error')
        }
      }

      const passwordsMatch = password === confirmPassword;

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
        }}>Kirjoita uusi salasana</Typography>
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
          id="password"
          label="Salasana"
          type='password'
          required
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          sx={{ marginBottom: '1rem' }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {password.length > 0 && password.length < 3 ? <CancelIcon /> : null}
                {password.length >= 3 ? <CheckCircleIcon /> : null}
              </InputAdornment>
            ),
          }}
        />
        <TextField
          id="confirm-password"
          label="Vahvista salasana"
          type="password"
          required
          fullWidth
          value={confirmPassword}
          onChange={({ target }) => setConfirmPassword(target.value)}
          sx={{ marginBottom: '1rem' }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {passwordsMatch && password.length !== 0 && (
            <CheckCircleIcon />
        )}
              </InputAdornment>
            ),
          }}
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

export default ResetPassword