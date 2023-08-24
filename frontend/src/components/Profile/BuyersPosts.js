import { Box, Typography, Container, Button } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNotification } from '../../hooks'
import { removePost } from '../../reducers/projectPosts'

const BuyersPosts = () => {
    const notify = useNotification()
    const user = useSelector(({user}) => user)
  const dispatch = useDispatch()
    const userProjectPosts = useSelector(({ projectPosts }) => projectPosts).filter(p => p.user.id === user.id)
    const userPortalPosts = useSelector(({ portalPosts }) => portalPosts).filter(p => p.user.id === user.id)

  const handleDelete = async (postId) => {
    const confirmed = window.confirm('Haluatko varmasti poistaa tämän ilmoituksen?')
    if (!confirmed) {
      return // If the user clicks "Cancel," do nothing
    }

    try {
      dispatch(removePost({ id: postId }))
      notify('Poistettu onnistuneesti', 'success')
    } catch (error) {
      notify('Ilmeni jokin ongelma poistossa', 'erro')
    }
  }

  if (!userProjectPosts || !userPortalPosts) {
    return (
      <Container>
        <Typography>Ladataan...</Typography>
      </Container>
    )
  }

  return (
    <Box>
        <Typography sx={{ marginBottom: '2rem' }}>Omat ilmoitukset</Typography>
        <Box>
        {userProjectPosts.length > 0 ? userProjectPosts.map(p => (
            <Box key={p.id} sx={{ backgroundColor: 'white', color: 'black', padding: '0.5rem',
            borderRadius: '0.5rem', marginBottom: '1rem'}}>
                <Typography sx={{ fontSize: '1.3rem' }}>{p.title}</Typography>
                <Typography sx={{ whiteSpace: 'break-spaces' }}>{p.description}</Typography>
                <Button component={Link} to={`/profiili/kayttaja/muokkaa/ilmoitus/${p.id}`} >Muokkaa ilmoituksen sisältöä</Button>
                <Button component={Link} to={`/avoimetprojektit/${p.id}`}>Siirry ilmoitukseen</Button>
                <Button sx={{ color: 'red' }} onClick={() => handleDelete(p.id)}>Poista ilmoitus</Button>
            </Box>  
        )) : (
            <Typography>Ei vielä ilmoituksia</Typography>
        )}
        </Box>
        <Typography>Omat portaali-ilmoitukset</Typography>
        <Box>
        {userPortalPosts.length > 0 ? userPortalPosts.map(p => (
            <Box key={p.id} sx={{ backgroundColor: 'white', color: 'black', padding: '0.5rem',
            borderRadius: '0.5rem', marginBottom: '1rem'}}>
                <Typography sx={{ fontSize: '1.3rem' }}>{p.title}</Typography>
                <Typography sx={{ whiteSpace: 'break-spaces' }}>{p.description}</Typography>
                <Button component={Link} to={`/profiili/kayttaja/muokkaa/ilmoitus/${p.id}`} >Muokkaa ilmoituksen sisältöä</Button>
                <Button component={Link} to={`/portaali/ilmoitukset/${p.id}`}>Siirry ilmoitukseen</Button>
                <Button sx={{ color: 'red' }} onClick={() => handleDelete(p.id)}>Poista ilmoitus</Button>
            </Box>  
        )) : (
            <Typography>Ei vielä ilmoituksia</Typography>
        )}
        </Box>
    </Box>
  )
}

export default BuyersPosts