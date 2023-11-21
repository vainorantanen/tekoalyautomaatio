import { Box, Typography, Container, Button, Divider } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNotification } from '../../hooks'
import { removePost, updatePost } from '../../reducers/projectPosts'
import { removePortalpost, updatePortalpost } from '../../reducers/portalPosts'
import FeedPostCard from '../OpenProjects/FeedPostCard'

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
      const result = await dispatch(removePost({ id: postId }))
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

  const handleDeletePortalPost = async (post) => {
    const confirmed = window.confirm('Haluatko varmasti poistaa tämän ilmoituksen?')
    if (!confirmed) {
      return // If the user clicks "Cancel," do nothing
    }

    try {
      const result = await dispatch(removePortalpost(post))
      if (result && result.error) {
        notify('Tapahtui virhe palvelimella', 'error')
        return
      } else {
        notify('Poistettu onnistuneesti', 'success')
      }
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
      const result = await dispatch(updatePost({ ...post, isOpen: !post.isOpen }))
      if (result && result.error) {
        notify('Tapahtui virhe palvelimella', 'error')
        return
      } else {
        notify('Tila muokattu onnistuneesti', 'success')
      }
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
      const result = await dispatch(updatePortalpost({ ...post, isOpen: !post.isOpen }))
      if (result && result.error) {
        notify('Tapahtui virhe palvelimella', 'error')
        return
      } else {
        notify('Tila muokattu onnistuneesti', 'success')
      }
      
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
        <Typography sx={{ fontSize: '1.5rem' }}
        id='openPosts'
        >Omat avoimet ilmoitukset ({openProjectPosts.length})</Typography>
        <Divider sx={{ my: 4 }} />
        <Box>
        {openProjectPosts.length > 0 ? openProjectPosts.map(p => (
            <Box key={p.id}>
                <FeedPostCard post={p} />
                <Box sx={{ textAlign: 'center' }}>
                <Button component={Link} to={`/profiili/kayttaja/muokkaa/ilmoitus/${p.id}`} >Muokkaa ilmoituksen sisältöä</Button>
                <Button component={Link} to={`/avoimetprojektit/${p.id}`}>Siirry ilmoitukseen</Button>
                <Button sx={{ color: 'red' }} onClick={() => handleCloseOrOpenProjectPost(p)}>{p.isOpen ? 'Aseta ilmoitus suljetuksi'
                : 'Aseta ilmoitus avoimeksi'}</Button>
                <Button sx={{ color: 'red' }} onClick={() => handleDeleteProjectPost(p.id)}>Poista ilmoitus</Button>
                </Box>
            </Box>  
        )) : (
            <Typography>Ei vielä ilmoituksia</Typography>
        )}
        </Box>
        <Typography
        id='closedPosts'
        sx={{ marginBottom: '1rem', fontSize: '1.3rem' }}>Omat suljetut ilmoitukset ({closedProjectPosts.length})</Typography>
        <Divider sx={{ my: 4 }} />
        <Box>
        {closedProjectPosts.length > 0 ? closedProjectPosts.map(p => (
            <Box key={p.id}>
                <FeedPostCard post={p}/>
                <Box sx={{ textAlign: 'center' }}>
                <Button component={Link} to={`/profiili/kayttaja/muokkaa/ilmoitus/${p.id}`} >Muokkaa ilmoituksen sisältöä</Button>
                <Button component={Link} to={`/avoimetprojektit/${p.id}`}>Siirry ilmoitukseen</Button>
                <Button sx={{ color: 'red' }} onClick={() => handleCloseOrOpenProjectPost(p)}>{p.isOpen ? 'Aseta ilmoitus suljetuksi'
                : 'Aseta ilmoitus avoimeksi'}</Button>
                <Button sx={{ color: 'red' }} onClick={() => handleDeleteProjectPost(p.id)}>Poista ilmoitus</Button>
                </Box>
            </Box>  
        )) : (
            <Typography>Ei vielä ilmoituksia</Typography>
        )}
        </Box>
        <Typography sx={{ fontSize: '1.5rem' }}>Omat portaali-ilmoitukset</Typography>
        <Divider sx={{ my: 4 }} />
        <Typography sx={{ fontSize: '1.5rem'}}>Avoimet</Typography>
        <Divider sx={{ my: 4 }} />
        <Box>
        {openPortalPosts.length > 0 ? openPortalPosts.map(p => (
            <Box key={p.id}>
                <FeedPostCard post={p} />
                <Button component={Link} to={`/profiili/kayttaja/muokkaa/ilmoitus/${p.id}`} >Muokkaa ilmoituksen sisältöä</Button>
                <Button component={Link} to={`/portaali/ilmoitukset/${p.id}`}>Siirry ilmoitukseen</Button>
                <Button sx={{ color: 'red' }} onClick={() => handleCloseOrOpenPortalPost(p)}>{p.isOpen ? 'Aseta ilmoitus suljetuksi'
                : 'Aseta ilmoitus avoimeksi'}</Button>
                <Button sx={{ color: 'red' }} onClick={() => handleDeletePortalPost(p)}>Poista ilmoitus</Button>
            </Box>  
        )) : (
            <Typography>Ei vielä ilmoituksia</Typography>
        )}
        </Box>
        <Typography sx={{ fontSize: '1.5rem' }}>Suljetut</Typography>
        <Divider sx={{ my: 4 }} />
        <Box>
        {closedPortalPosts.length > 0 ? closedPortalPosts.map(p => (
            <Box key={p.id}>
                <FeedPostCard post={p} />
                <Button component={Link} to={`/profiili/kayttaja/muokkaa/ilmoitus/${p.id}`} >Muokkaa ilmoituksen sisältöä</Button>
                <Button component={Link} to={`/portaali/ilmoitukset/${p.id}`}>Siirry ilmoitukseen</Button>
                <Button sx={{ color: 'red' }} onClick={() => handleCloseOrOpenPortalPost(p)}>{p.isOpen ? 'Aseta ilmoitus suljetuksi'
                : 'Aseta ilmoitus avoimeksi'}</Button>
                <Button sx={{ color: 'red' }} onClick={() => handleDeletePortalPost(p)}>Poista ilmoitus</Button>
            </Box>  
        )) : (
            <Typography>Ei vielä ilmoituksia</Typography>
        )}
        </Box>
    </Box>
  )
}

export default BuyersPosts