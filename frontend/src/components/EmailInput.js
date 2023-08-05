import { Box, Typography, TextField, Checkbox, Button } from '@mui/material'
import React from 'react'
import contactService from '../services/contact'

import { useState } from 'react'


const EmailInput = () => {
    const [email, setEmail] = useState('')
  const [isCompany, setIsCompany] = useState(false);

  const addFeedPost = async (newPost) => {
    try {
      await contactService.create(newPost)
    } catch (error) {
      console.log("error sending form data")
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    await addFeedPost({
      email, isCompany
    })
    setEmail('')
    setIsCompany(false);
  }

  return (
    <Box>
        <Box component="form" onSubmit={handleSubmit}>
      <Typography>
        Syöttämällä sähköpostiosoitteesi ilmoitamme sinulle heti, kun palvelumme aukeaa!
      </Typography>
      <TextField
        id="email"
        label="Syötä sähköpostiosoitteesi"
        required
        fullWidth
        variant="outlined"
        value={email}
        onChange={({ target }) => setEmail(target.value)}
        sx={{ marginBottom: '1rem', marginTop: '1rem', maxWidth: '36rem' }}
      />
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Checkbox
          checked={isCompany}
          onChange={(e) => setIsCompany(e.target.checked)}
          color="primary"
        />
        <Typography>Käyttäisin tekoälyautomaatio.fi:tä palveluja tarjoavana yrityksenä</Typography>
      </Box>
      <Button
        type="submit"
        variant="contained"
        color="primary"
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
    </Box>
  )
}

export default EmailInput