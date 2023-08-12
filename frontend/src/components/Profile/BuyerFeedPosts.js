import { Box, Typography, Container, Button } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNotification } from '../../hooks'
import { removeFeedPost } from '../../reducers/feedPosts'

const BuyerFeedPosts = () => {
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
      dispatch(removeFeedPost({ id: postId }))
      notify('Poistettu onnistuneesti', 'success')
    } catch (error) {
      notify('Ilmeni jokin ongelma poistossa', 'erro')
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
        <Box>
        {userFeedPosts.length > 0 ? userFeedPosts.map(p => (
            <Box key={p.id} sx={{ backgroundColor: 'white', color: 'black', padding: '0.5rem',
            borderRadius: '0.5rem', marginBottom: '1rem'}}>
                <Typography sx={{ whiteSpace: 'break-spaces' }}>{p.description}</Typography>
                <Button component={Link} to={`/profiili/kayttaja/muokkaa/ilmoitus/${p.id}`} >Muokkaa ilmoituksen sisältöä</Button>
                <Button component={Link} to={`/kehittajienilmoitukset/${p.id}`}>Siirry ilmoitukseen</Button>
                <Button sx={{ color: 'red' }} onClick={() => handleDelete(p.id)}>Poista ilmoitus</Button>
            </Box>  
        )) : (
            <Typography>Ei vielä ilmoituksia</Typography>
        )}
        </Box>
    </Box>
  )
}

export default BuyerFeedPosts