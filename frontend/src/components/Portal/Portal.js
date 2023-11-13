import { Box, Container, Typography, Button } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PortalPostCard from './PortalPostCard'
import { Link } from 'react-router-dom'
import LoginSuggestion from '../LoginSuggestion'
import { useNotification } from '../../hooks'
import { initializePortalPosts, removePortalpost, updatePortalpost } from '../../reducers/portalPosts'
import { initializePortalBids } from '../../reducers/portalBids'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';

const Portal = () => {

  const user = useSelector(({user}) => user)
  const notify = useNotification()

  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch portal posts when the component mounts
    try {
        dispatch(initializePortalPosts())
        dispatch(initializePortalBids())
    } catch (error) {
        notify('Tapahtui virhe haettaessa portaalin tietoja')
        console.error('Error fetching portal posts:', error);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const openPortalProjects = useSelector(({portalPosts}) => portalPosts).filter(p => p.isOpen && new Date(p.dueDate) > new Date())
  const numberOfOpenPortalProjects = openPortalProjects.length
  const closedPortalProjects = useSelector(({portalPosts}) => portalPosts).filter(p => !p.isOpen || new Date(p.dueDate) < new Date())
  const numberOfClosedPortalProjects = closedPortalProjects.length

  const handleDeletePortalPost = async (postId) => {
    const confirmed = window.confirm('Haluatko varmasti poistaa tämän ilmoituksen?')
    if (!confirmed) {
      return // If the user clicks "Cancel," do nothing
    }

    try {
      const result = await dispatch(removePortalpost({ id: postId }))
      if (result && result.error) {
        notify(result.error.response.data.error, 'error')
        return
      } else {
        notify('Poistettu onnistuneesti', 'success')
      } 
    } catch (error) {
      notify('Ilmeni jokin ongelma poistossa', 'erro')
    }
  }

  const handleCloseOrOpenPortalPost = async (post) => {
    const state = post.isOpen ? 'suljettu' : 'avoin'
    const confirmed = window.confirm(`Haluatko varmasti asettaa ilmoituksen tilaan: ${state}?`)
    if (!confirmed) {
      return // If the user clicks "Cancel," do nothing
    }

    try {
      const result = await dispatch(updatePortalpost({ ...post, isOpen: !post.isOpen }))
      if (result && result.error) {
        notify(result.error.response.data.error, 'error')
        return
      } else {
        notify('Tila muokattu onnistuneesti', 'success')
      }
    } catch (error) {
      notify('Ilmeni jokin ongelma', 'erro')
    }
  }

  if (!user) {
    return (
      <LoginSuggestion />
    )
  }

  return (
    <Container sx={{ marginTop: '5rem', minHeight: '90vh' }}>
        <Typography sx={{
          fontSize: '1.8rem',
          textAlign: 'center',
          marginBottom: '2rem',
          '@media (max-width: 442px)': {
            fontSize: '1.3rem',
          },
        }}>
            Portaali
        </Typography>

        <Container>
        {!user.isDeveloper ? (
          <Typography sx={{ fontSize: '1.2rem', marginBottom: '1rem',
          borderBottom: '1px solid black' }}>Omat avoimet portaali-ilmoitukseni ({numberOfOpenPortalProjects})</Typography>
        ): (
          <Typography sx={{ fontSize: '1.2rem', marginBottom: '1rem',
    borderBottom: '1px solid black' }}>Avoimet portaali-ilmoitukset ({numberOfOpenPortalProjects})</Typography>
        )}
        {openPortalProjects && openPortalProjects.length > 0 ? (
          openPortalProjects.map(proj => (
            <Box key={proj.id}>
                <PortalPostCard post={proj}/>
                {!user.isDeveloper && user.id === proj.user.id && (
                  <Box sx={{ textAlign: 'center' }}>
                  <Button component={Link} to={`/profiili/kayttaja/muokkaa/portaaliilmoitus/${proj.id}`} >Muokkaa ilmoituksen sisältöä<EditIcon/></Button>
                  <Button component={Link} to={`/portaali/ilmoitukset/${proj.id}`}>Siirry ilmoitukseen<ArrowForwardIcon /></Button>
                  <Button sx={{ color: 'red' }} onClick={() => handleCloseOrOpenPortalPost(proj)}>{proj.isOpen ? 'Aseta ilmoitus suljetuksi'
                  : 'Aseta ilmoitus avoimeksi'}<ChangeCircleIcon /></Button>
                  <Button sx={{ color: 'red' }} onClick={() => handleDeletePortalPost(proj.id)}>Poista ilmoitus<DeleteIcon /></Button>
                    </Box>
                )}
            </Box>
        ))): (
          <Typography sx={{ textAlign: 'center' }}>Ei portaali-ilmoituksia</Typography>
        )}
        {!user.isDeveloper && (
          <Box>
            <Typography sx={{ fontSize: '1.2rem', marginBottom: '1rem',
          borderBottom: '1px solid black' }}>Suljetut portaali-ilmoitukseni ({numberOfClosedPortalProjects})</Typography>
            {closedPortalProjects && closedPortalProjects.length > 0 ? (
          closedPortalProjects.map(proj => (
            <Box key={proj.id}>
                <PortalPostCard post={proj}/>
                <Box sx={{ textAlign: 'center' }}>
                <Button component={Link} to={`/profiili/kayttaja/muokkaa/portaaliilmoitus/${proj.id}`} >Muokkaa ilmoituksen sisältöä<EditIcon/></Button>
                <Button component={Link} to={`/portaali/ilmoitukset/${proj.id}`}>Siirry ilmoitukseen<ArrowForwardIcon /></Button>
                <Button sx={{ color: 'red' }} onClick={() => handleCloseOrOpenPortalPost(proj)}>{proj.isOpen ? 'Aseta ilmoitus suljetuksi'
                : 'Aseta ilmoitus avoimeksi'}<ChangeCircleIcon /></Button>
                <Button sx={{ color: 'red' }} onClick={() => handleDeletePortalPost(proj.id)}>Poista ilmoitus<DeleteIcon /></Button>
                  </Box>
            </Box>
        ))): (
          <Typography sx={{ textAlign: 'center' }}>Ei portaali-ilmoituksia</Typography>
        )}
          </Box>
        )}
    </Container>
    </Container>
  )
}

export default Portal