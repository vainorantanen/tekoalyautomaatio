import React from 'react'
import { Container, Box, TextField, Button, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import loginService from '../services/login'
import userService from '../services/user'
import { loginUser } from '../reducers/user'
import { useField } from '../hooks'

import { set as setNotification } from '../reducers/notification'

const LoginForm = () => {
  const username = useField('text')
  const password = useField('password')

  const dispatch = useDispatch()

  const notify = (message, type = 'info') => {
    dispatch(setNotification({ message, type }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    loginService
      .login({
        username: username.value,
        password: password.value,
      })
      .then((user) => {
        console.log('user in handlesubmit', user)
        userService.setUser(user)

        dispatch(loginUser(user))
        notify(`${user.name} logged in!`)
      })
      .catch(() => {
        notify('wrong username/password', 'alert')
      })
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
          value={username.value}
          className="username-input"
          onChange={username.onChange}
          sx={{ marginBottom: '1rem' }}
        />
        <TextField
          id="login-password"
          label="Salasana"
          type="password"
          required
          value={password.value}
          className="password-input"
          onChange={password.onChange}
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
        }}>Eikö sinulla ole vielä käyttäjää? <Button>Reksiteröidy</Button></Typography>
      </Box>
    </Container>
  )
}

export default LoginForm
