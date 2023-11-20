import { Box, Typography, Container, Button, Divider } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNotification } from '../../hooks'
import { removeFeedPost } from '../../reducers/feedPosts'

const UserFeedPosts = () => {
    const notify = useNotification()
    const user = useSelector(({user}) => user)
  const dispatch = useDispatch()
    const userFeedPosts = useSelector(({ feedPosts }) => feedPosts).filter(p => p.user.id === user.id)

  const handleDelete = async (postId) => {
    const confirmed = window.confirm('Haluatko varmasti poistaa tämän ilmoituksen?')
    if (!confirmed) {
      return // If the user clicks "Cancel," do nothing
    }

    try {
      const result = await dispatch(removeFeedPost({ id: postId }))
      if (result && result.error) {
        notify('Ilmeni jokin ongelma poistossa', 'error')
        return
      }
      notify('Poistettu onnistuneesti', 'success')
    } catch (error) {
      notify('Ilmeni jokin ongelma poistossa', 'error')
    }
  }

  if (!userFeedPosts) {
    return (
      <Container>
        <Typography>Ladataan...</Typography>
      </Container>
    )
  }

  return (
    <Box>
      <Typography sx={{ fontSize: '1.5rem' }}>Omat julkaisut</Typography>
      <Divider sx={{ my: 4 }} />
        {userFeedPosts.length > 0 ? userFeedPosts.map(p => (
            <Box key={p.id} sx={{ backgroundColor: 'white', color: 'black', padding: '0.5rem',
            borderRadius: '0.5rem', marginBottom: '1rem'}}>
                <Typography sx={{ whiteSpace: 'break-spaces' }}>{p.description}</Typography>
                <Button component={Link} to={`/profiili/muokkaa/julkaisu/${p.id}`} >Muokkaa julkaisua</Button>
                <Button component={Link} to={`/feed/${p.id}`}>Siirry ilmoitukseen</Button>
                <Button sx={{ color: 'red' }} onClick={() => handleDelete(p.id)}>Poista ilmoitus</Button>
            </Box>  
        )) : (
            <Typography>Ei vielä julkaisuja</Typography>
        )}
    </Box>
  )
}

export default UserFeedPosts