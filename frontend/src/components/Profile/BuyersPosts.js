import { Box, Typography, Container, Button } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNotification } from '../../hooks'
import { removePost, updatePost } from '../../reducers/projectPosts'
import { removePortalPost, updatePortalPost } from '../../reducers/portalPosts'

const BuyersPosts = () => {
    const notify = useNotification()
    const user = useSelector(({user}) => user)
  const dispatch = useDispatch()
    const userProjectPosts = useSelector(({ projectPosts }) => projectPosts).filter(p => p.user.id === user.id)
    const userPortalPosts = useSelector(({ portalPosts }) => portalPosts).filter(p => p.user.id === user.id)

  const handleDeleteProjectPost = async (postId) => {
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

  const handleDeletePortalPost = async (postId) => {
    const confirmed = window.confirm('Haluatko varmasti poistaa tämän ilmoituksen?')
    if (!confirmed) {
      return // If the user clicks "Cancel," do nothing
    }

    try {
      dispatch(removePortalPost({ id: postId }))
      notify('Poistettu onnistuneesti', 'success')
    } catch (error) {
      notify('Ilmeni jokin ongelma poistossa', 'erro')
    }
  }

  const handleCloseOrOpenProjectPost = async (post) => {
    const state = post.isOpen ? 'suljettu' : 'avoin'
    const confirmed = window.confirm(`Haluatko varmasti asettaa ilmoituksen tilaan: ${state}?`)
    if (!confirmed) {
      return // If the user clicks "Cancel," do nothing
    }

    try {
      dispatch(updatePost({ ...post, isOpen: !post.isOpen }))
      notify('Tila muokattu onnistuneesti', 'success')
    } catch (error) {
      notify('Ilmeni jokin ongelma', 'erro')
    }
  }

  const handleCloseOrOpenPortalPost = async (post) => {
    const state = post.isOpen ? 'suljettu' : 'avoin'
    const confirmed = window.confirm(`Haluatko varmasti asettaa ilmoituksen tilaan: ${state}?`)
    if (!confirmed) {
      return // If the user clicks "Cancel," do nothing
    }

    try {
      dispatch(updatePortalPost({ ...post, isOpen: !post.isOpen }))
      notify('Tila muokattu onnistuneesti', 'success')
    } catch (error) {
      notify('Ilmeni jokin ongelma', 'erro')
    }
  }

  if (!userProjectPosts || !userPortalPosts) {
    return (
      <Container>
        <Typography>Ladataan...</Typography>
      </Container>
    )
  }

  const openProjectPosts = userProjectPosts.filter(p => p.isOpen)
  const closedProjectPosts = userProjectPosts.filter(p => !p.isOpen)
  const openPortalPosts = userPortalPosts.filter(p => p.isOpen)
  const closedPortalPosts = userPortalPosts.filter(p => !p.isOpen)

  return (
    <Box>
        <Typography sx={{ marginBottom: '2rem', fontSize: '1.5rem', borderBottom: '1px solid white' }}>Omat ilmoitukset</Typography>
        <Typography sx={{ fontSize: '1.5rem', borderBottom: '1px solid white', marginBottom: '1rem' }}>Avoimet</Typography>
        <Box>
        {openProjectPosts.length > 0 ? openProjectPosts.map(p => (
            <Box key={p.id} sx={{ backgroundColor: 'white', color: 'black', padding: '0.5rem',
            borderRadius: '0.5rem', marginBottom: '1rem'}}>
                <Typography sx={{ fontSize: '1.3rem' }}>{p.title}</Typography>
                <Typography sx={{ whiteSpace: 'break-spaces' }}>{p.description}</Typography>
                <Button component={Link} to={`/profiili/kayttaja/muokkaa/ilmoitus/${p.id}`} >Muokkaa ilmoituksen sisältöä</Button>
                <Button component={Link} to={`/avoimetprojektit/${p.id}`}>Siirry ilmoitukseen</Button>
                <Button sx={{ color: 'red' }} onClick={() => handleCloseOrOpenProjectPost(p)}>{p.isOpen ? 'Aseta ilmoitus suljetuksi'
                : 'Aseta ilmoitus avoimeksi'}</Button>
                <Button sx={{ color: 'red' }} onClick={() => handleDeleteProjectPost(p.id)}>Poista ilmoitus</Button>
            </Box>  
        )) : (
            <Typography>Ei vielä ilmoituksia</Typography>
        )}
        </Box>
        <Typography sx={{ marginBottom: '1rem', marginTop: '1rem', fontSize: '1.5rem', borderBottom: '1px solid white' }}>Suljetut</Typography>
        <Box>
        {closedProjectPosts.length > 0 ? closedProjectPosts.map(p => (
            <Box key={p.id} sx={{ backgroundColor: 'white', color: 'black', padding: '0.5rem',
            borderRadius: '0.5rem', marginBottom: '1rem'}}>
                <Typography sx={{ fontSize: '1.3rem' }}>{p.title}</Typography>
                <Typography sx={{ whiteSpace: 'break-spaces' }}>{p.description}</Typography>
                <Button component={Link} to={`/profiili/kayttaja/muokkaa/ilmoitus/${p.id}`} >Muokkaa ilmoituksen sisältöä</Button>
                <Button component={Link} to={`/avoimetprojektit/${p.id}`}>Siirry ilmoitukseen</Button>
                <Button sx={{ color: 'red' }} onClick={() => handleCloseOrOpenProjectPost(p)}>{p.isOpen ? 'Aseta ilmoitus suljetuksi'
                : 'Aseta ilmoitus avoimeksi'}</Button>
                <Button sx={{ color: 'red' }} onClick={() => handleDeleteProjectPost(p.id)}>Poista ilmoitus</Button>
            </Box>  
        )) : (
            <Typography>Ei vielä ilmoituksia</Typography>
        )}
        </Box>
        <Typography sx={{ fontSize: '1.5rem', marginBottom: '1rem',borderBottom: '1px solid white' }}>Omat portaali-ilmoitukset</Typography>
        <Typography sx={{ fontSize: '1.5rem', borderBottom: '1px solid white', marginBottom: '1rem' }}>Avoimet</Typography>
        <Box>
        {openPortalPosts.length > 0 ? openPortalPosts.map(p => (
            <Box key={p.id} sx={{ backgroundColor: 'white', color: 'black', padding: '0.5rem',
            borderRadius: '0.5rem', marginBottom: '1rem'}}>
                <Typography sx={{ fontSize: '1.3rem' }}>{p.title}</Typography>
                <Typography sx={{ whiteSpace: 'break-spaces' }}>{p.description}</Typography>
                <Button component={Link} to={`/profiili/kayttaja/muokkaa/ilmoitus/${p.id}`} >Muokkaa ilmoituksen sisältöä</Button>
                <Button component={Link} to={`/portaali/ilmoitukset/${p.id}`}>Siirry ilmoitukseen</Button>
                <Button sx={{ color: 'red' }} onClick={() => handleCloseOrOpenPortalPost(p)}>{p.isOpen ? 'Aseta ilmoitus suljetuksi'
                : 'Aseta ilmoitus avoimeksi'}</Button>
                <Button sx={{ color: 'red' }} onClick={() => handleDeletePortalPost(p.id)}>Poista ilmoitus</Button>
            </Box>  
        )) : (
            <Typography>Ei vielä ilmoituksia</Typography>
        )}
        </Box>
        <Typography sx={{ fontSize: '1.5rem', marginTop: '1rem', borderBottom: '1px solid white' }}>Suljetut</Typography>
        <Box>
        {closedPortalPosts.length > 0 ? closedPortalPosts.map(p => (
            <Box key={p.id} sx={{ backgroundColor: 'white', color: 'black', padding: '0.5rem',
            borderRadius: '0.5rem', marginBottom: '1rem'}}>
                <Typography sx={{ fontSize: '1.3rem' }}>{p.title}</Typography>
                <Typography sx={{ whiteSpace: 'break-spaces' }}>{p.description}</Typography>
                <Button component={Link} to={`/profiili/kayttaja/muokkaa/ilmoitus/${p.id}`} >Muokkaa ilmoituksen sisältöä</Button>
                <Button component={Link} to={`/portaali/ilmoitukset/${p.id}`}>Siirry ilmoitukseen</Button>
                <Button sx={{ color: 'red' }} onClick={() => handleCloseOrOpenPortalPost(p)}>{p.isOpen ? 'Aseta ilmoitus suljetuksi'
                : 'Aseta ilmoitus avoimeksi'}</Button>
                <Button sx={{ color: 'red' }} onClick={() => handleDeletePortalPost(p.id)}>Poista ilmoitus</Button>
            </Box>  
        )) : (
            <Typography>Ei vielä ilmoituksia</Typography>
        )}
        </Box>
    </Box>
  )
}

export default BuyersPosts