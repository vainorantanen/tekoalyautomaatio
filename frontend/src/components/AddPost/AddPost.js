import React, { useState } from 'react'
import {
  TextField,
  Button,
  Typography,
  Container,
  FormControlLabel,
  Checkbox,
  Box,
} from '@mui/material'

import { useDispatch, useSelector } from 'react-redux'
import { useNotification } from '../../hooks'
import { addPost } from '../../reducers/projectPosts'
import { addPortalPost } from '../../reducers/portalPosts'

const AddPost = () => {
  const [description, setDescription] = useState('')
  const [ title, setTitle ] = useState('')
  const [ isPortalPost, setIsPortalPost ] = useState(false)

  const user = useSelector(({ user }) => user)
  const notify = useNotification()
  
  const dispatch = useDispatch()

  const handleIsPortalPostChange = (e) => {
    setIsPortalPost(e.target.checked)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      if (isPortalPost) {
        dispatch(addPortalPost({
          title, description
        }))
      } else {
        dispatch(addPost({
          title,
          description,
        }))
      }
      notify('Postaus lisätty onnistuneesti', 'success')
      setDescription('')
      setTitle('')
    } catch (error) {
      notify('Ilmeni jokin ongelma postauksen teossa, yritä myöhemmin uudelleen', 'error')
    }

  }

  if (!user) {
    return (
      <Container sx={{ marginTop: '8rem', minHeight: '100vh' }}>
        <Typography
          sx={{
            fontSize: '1.3rem',
            textAlign: 'center',
            marginTop: '2rem',
            '@media (max-width: 442px)': {
              fontSize: '1rem',
            },
          }}
        >
          Kirjaudu kuluttajatilillä sisään lisätäksesi ilmoitus.
        </Typography>
      </Container>
    )
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
        Lisää ilmoitus
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
        <FormControlLabel
          control={<Checkbox checked={isPortalPost} onChange={handleIsPortalPostChange}
          id='isportalpostcheck' />}
          label="Valitse tämä, jos haluat julkaista ilmoituksen vain toimittajien nähtäville"
          sx={{ marginBottom: '1rem' }}
        />
        <TextField
          id="title"
          label="Otsikko"
          required
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          sx={{ marginBottom: '1rem' }}
        />
        <TextField
          id="description"
          label="Kuvaile etsimääsi tekoälyprojektia..."
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
          Julkaise
        </Button>
      </Box>
    </Container>
  )
}

export default AddPost
