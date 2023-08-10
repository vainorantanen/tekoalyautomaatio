import React from 'react'
import { Container, Box, TextField, Button, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/user'
import { useState } from "react";
import { useNotification } from '../hooks'
import { Link } from 'react-router-dom'

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch()

  const notify = useNotification()
  
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      dispatch(loginUser({ username, password }))
      setUsername('')
      setPassword('')
    } catch (e) {
      notify('Väärä käyttäjätunnus tai salasana', 'error')
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
        }}>Kirjaudu</Typography>
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
          id="login-username"
          label="Käyttäjätunnus"
          required
          value={username}
          className="username-input"
          onChange={({ target }) => setUsername(target.value)}
          sx={{ marginBottom: '1rem' }}
        />
        <TextField
          id="login-password"
          label="Salasana"
          type="password"
          required
          value={password}
          className="password-input"
          onChange={({ target }) => setPassword(target.value)}
          sx={{ marginBottom: '1rem' }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className='login-button-input'
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
          Kirjaudu
        </Button>
      </Box>
      <Box>
        <Typography sx={{
          fontSize: '1rem',
          textAlign: 'center',
        }}>Eikö sinulla ole vielä käyttäjää? <Button component={Link}
          to='/register'
        >Reksiteröidy</Button></Typography>
      </Box>
    </Container>
  )
}

export default LoginForm
