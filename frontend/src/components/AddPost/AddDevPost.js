import React, { useState } from 'react'
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'

import { useDispatch, useSelector } from 'react-redux'
import { useNotification } from '../../hooks'
import { addDevPost } from '../../reducers/devsPosts'


const AddDevPost = () => {
  const [description, setDescription] = useState('')
  const [ title, setTitle ] = useState('')
  const [postType, setPostType] = useState('normal');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [time, setTime] = useState('');

  const user = useSelector(({ user }) => user)
  const notify = useNotification()
  
  const dispatch = useDispatch()


  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      dispatch(addDevPost({
        title,
        description,
        postType,
        price,
        time,
        location
      }))
      notify('Postaus lisätty onnistuneesti', 'success')
      setDescription('')
      setTitle('')
      setPrice('')
      setTime('')
      setLocation('')
    } catch (error) {
      notify('Ilmeni jokin ongelma postauksen teossa, yritä myöhemmin uudelleen', 'error')
    }

  }

  if (!user || !user.isDeveloper) {
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
          Kirjaudu kehittäjätilillä sisään lisätäksesi ilmoitus.
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
        <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
          <InputLabel id="postTypeLabel">Valitse tyyppi</InputLabel>
          <Select
            labelId="postTypeLabel"
            id="postType"
            value={postType}
            onChange={(event) => setPostType(event.target.value)}
          >
            <MenuItem value="normal">Tavallinen ilmoitus</MenuItem>
            <MenuItem value="event">Tapahtuma</MenuItem>
            <MenuItem value="course">Koulutus tai kurssi</MenuItem>
          </Select>
        </FormControl>
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
          label="Kuvaile tarjoamaasi tekoälyprojektia..."
          required
          multiline
          rows={15}
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          sx={{ marginBottom: '1rem' }}
        />
        <TextField
          id="price"
          label="Hinnoittelu (esim. ilmainen, 30€/h tai 100€)"
          type="text"
          required
          value={price}
          onChange={({ target }) => setPrice(target.value)}
          sx={{ marginBottom: '1rem' }}
        />
        {postType !== 'normal' && (
          <Box sx={{ 
            display: 'flex',
          flexDirection: 'column',
           }}>
          <TextField
          id="location"
          label="Sijainti"
          type="text"
          required
          value={location}
          onChange={({ target }) => setLocation(target.value)}
          sx={{ marginBottom: '1rem' }}
        />
        <TextField
          id="time"
          label="Aika"
          type="text"
          required
          value={time}
          onChange={({ target }) => setTime(target.value)}
          sx={{ marginBottom: '1rem' }}
        />
        </Box>
        )}
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

export default AddDevPost
