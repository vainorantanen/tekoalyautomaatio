import { Box, Button, Container, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useNotification } from '../../hooks'
import { updateDevPost } from '../../reducers/devsPosts'
import LoginSuggestion from '../LoginSuggestion'
import UserDisabledText from '../UserDisabledText'

const ModifyDevPost = () => {
  
  const notify = useNotification()
  const dispatch = useDispatch()

    const postId = useParams().id
    const user = useSelector(({user}) => user)

    const userPost = useSelector(({ devsPosts }) => devsPosts).find(p => p.id === postId)
    
    const [description, setDescription] = useState('')
    const [ title, setTitle ] = useState('')
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [time, setTime] = useState('');


    useEffect(() => {
      if (userPost) {
        setDescription(userPost.description);
        setTitle(userPost.title)
        setPrice(userPost.price)
        setTime(userPost.time)
        setLocation(userPost.location)
      }
    }, [userPost]);

    const handleSubmit = async (event) => {

      event.preventDefault()

      try {
          const result = await dispatch(updateDevPost({...userPost, description, title, price, location, time }))
          if (result && result.error) {
            notify('Tapahtui virhe palvelimella', 'error')
            return
          } else {
            notify('Päivitys tehty onnistuneesti', 'success')
            }
      } catch (error) {
          notify('Ilmeni jokin ongelma päivityksessä, yritä myöhemmin uudelleen', 'error')
      }
  }

  if (!user) {
    return (
      <LoginSuggestion />
    )
  }

  if (user && user.disabled) {
    return (
      <Container sx={{ marginTop: '6rem' }}>
        <UserDisabledText />
      </Container>
    )
  }

    if (!userPost || user.id !== userPost.user.id) {
        <Container>
            <Typography>Error loading data</Typography>
        </Container>
    }

  return (
    <Container sx={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', textAlign: 'center', justifyContent: 'center', alignItems: 'center',
    marginTop: '5rem', borderRadius: '0.5rem' }}>
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
        <Typography sx={{ marginBottom: '4rem' }}>Muokkaa ilmoituksen sisältöä</Typography>
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
          label="Ilmoituksen kuvaus"
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
        {userPost && userPost.postType !== 'normal' && (
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
        <Button className="bn632-hover bn26"
            type='submit'
            fullWidth
            sx={{color: 'white',
            }}>
            Päivitä
            </Button>
            </Box>
    </Container>
  )
}

export default ModifyDevPost