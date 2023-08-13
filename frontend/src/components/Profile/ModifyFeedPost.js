import React from 'react'

import { Button, Container, TextField, Typography } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useNotification } from '../../hooks'
import { updateFeedPost } from '../../reducers/feedPosts'

const ModifyFeedPost = () => {
  
  const notify = useNotification()
  const dispatch = useDispatch()

    const postId = useParams().id
    const user = useSelector(({user}) => user)

    const userPost = useSelector(({ feedPosts }) => feedPosts).find(p => p.id === postId)
    const [description, setDescription] = useState(userPost.description)
    
    const handleSubmit = async () => {
      try {
          dispatch(updateFeedPost({...userPost, description }))
          setDescription('')
          notify('Päivitys tehty onnistuneesti', 'success')
      } catch (error) {
          notify('Ilmeni jokin ongelma päivityksessä, yritä myöhemmin uudelleen', 'error')
      }
  }

    if (!userPost || user.id !== userPost.user.id) {
        <Container>
            <Typography>Error loading data</Typography>
        </Container>
    }

  return (
    <Container sx={{  backgroundColor: '#393939', minHeight: '90vh', display: 'flex', flexDirection: 'column', textAlign: 'center', justifyContent: 'center', alignItems: 'center',
    marginTop: '5rem', borderRadius: '0.5rem' }}>
        <Typography sx={{ marginBottom: '4rem' }}>Muokkaa ilmoituksen sisältöä</Typography>
        <TextField
        id="description"
        label="Muokkaa ilmoitusta"
        multiline
        fullWidth
        rows={16}
        value={description}
        onChange={({ target }) => setDescription(target.value)}
        sx={{ marginBottom: '1rem',  maxWidth: '40rem' }}
      />
        <Button
        onClick={handleSubmit}
        variant="contained"
        sx={{
          backgroundColor: 'blue',
          color: 'white',
          transition: 'transform 0.3s',
          '&:hover': {
            transform: 'scale(1.05)',
            backgroundImage: 'linear-gradient(to bottom, #003eff, #006eff)',
          },
        }}
      >
        Päivitä
      </Button>
    </Container>
  )
}

export default ModifyFeedPost