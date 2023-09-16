import React, { useState } from 'react'
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
} from '@mui/material'

import { useDispatch } from 'react-redux'
import { useNotification } from '../hooks'
import { addCustomerSupportPost } from '../reducers/customersupport'

const CustomerSupportForm = () => {
  const [description, setDescription] = useState('')
  const [ title, setTitle ] = useState('')
    const [ email, setEmail ] = useState('')

  const notify = useNotification()
  
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      dispatch(addCustomerSupportPost({ description, title, email }))
      notify('Lähetetty onnistuneesti', 'success')
      setDescription('')
      setTitle('')
      setEmail('')
    } catch (error) {
      notify('Ilmeni jokin ongelma lähetyksessä, yritä myöhemmin uudelleen', 'error')
    }

  }

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '90vh',
        borderRadius: '0.5rem',
        backgroundColor: '#222222',
        marginTop: '5rem'
      }}
    >
      <Typography
        sx={{
          fontSize: '1.3rem',
          textAlign: 'center',
          marginTop: '6rem',
          '@media (max-width: 442px)': {
            fontSize: '1rem',
          },
        }}
      >
        Ota yhteyttä asiakaspalveluumme. Vastaamme vuorokauden sisällä.
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
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
          id="title"
          label="Otsikko"
          required
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          sx={{ marginBottom: '1rem' }}
        />
        <TextField
          id="email"
          label="Sähköpostiosoitteesi"
          required
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          sx={{ marginBottom: '1rem' }}
        />
        <TextField
          id="description"
          label="Kuvaus..."
          required
          multiline
          rows={15}
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          sx={{ marginBottom: '1rem' }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            backgroundColor: 'blue',
            color: 'white',
            transition: 'transform 0.3s',
            marginTop: '1rem',
            marginBottom: '1rem',
            '&:hover': {
              transform: 'scale(1.05)',
              backgroundImage: 'linear-gradient(to bottom, #003eff, #006eff)',
            },
          }}
        >
          Lähetä
        </Button>
      </Box>
    </Container>
  )
}

export default CustomerSupportForm
