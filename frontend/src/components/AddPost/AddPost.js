import React, { useState } from 'react'
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
} from '@mui/material'

import projectPostService from '../../services/projectPosts'
import { useSelector } from 'react-redux'
import { useNotification } from '../../hooks'

const AddPost = () => {
  const [description, setDescription] = useState('')

  const user = useSelector(({ user }) => user)
  const notify = useNotification()
  
  const addFeedPost = async (newPost) => {
    const addedPost = await projectPostService.create(newPost)
    //setFeedPosts(feedPosts.concat(addedPost))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await addFeedPost({
        description,
        timeStamp: new Date(),
      })
      notify('Postaus lisätty onnistuneesti', 'success')
      setDescription('')      
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
        minHeight: '100vh',
        borderRadius: '1rem',
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
        <TextField
          id="description"
          label="Kuvaile tekoälyprojektiasi tarkemmin..."
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
