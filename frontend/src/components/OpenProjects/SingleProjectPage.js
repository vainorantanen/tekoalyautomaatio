import { Box, Button, Container, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useNotification } from '../../hooks'
import MakeOfferForm from './MakeOfferForm'
import Togglable from '../Togglable'
import { CheckCircleOutline } from '@mui/icons-material'
import { modifyOfferApprovedState, removOfferFromProjectPost } from '../../reducers/projectPosts'
import { addChat } from '../../reducers/chats'


const SingleProjectPage = () => {

  const dispatch = useDispatch()
  const notifyWith = useNotification()

  const id = useParams().id

  const user = useSelector(({ user }) => user)
  const projectPost = useSelector(({ projectPosts }) => projectPosts.find(p => p.id === id))

  const handleAcceptOffer = async (offerId) => {
    const confirmed = window.confirm('Haluatko varmasti hyväksyä tämän tarjouksen?')
    if (!confirmed) {
      return // If the user clicks "Cancel," do nothing
    }
    try {
      dispatch(modifyOfferApprovedState(offerId, projectPost.id))
      notifyWith('Tarjous hyväksytty', 'success')
    } catch (error) {
      notifyWith('Tarjouksen hyväksyntä epäonnistui', 'error')
    }

  }

  const handleDeleteOffer = async (offerId) => {
    const confirmed = window.confirm('Haluatko varmasti poistaa tämän tarjouksen?')
    if (!confirmed) {
      return // If the user clicks "Cancel," do nothing
    }
    try {
      dispatch(removOfferFromProjectPost(offerId, projectPost.id))
      notifyWith('Poistettu onnistuneesti', 'success')
    } catch (error) {
      notifyWith('Tarjouksen poisto epäonnistui', 'error')
    }

  }

  const handleChatStart = async () => {
    const confirmed = window.confirm(`Luodaanko uusi keskustelu käyttäjän ${projectPost.user.name} kanssa?`)
    if (!confirmed) {
      return // If the user clicks "Cancel," do nothing
    }
    try {
      dispatch(addChat({targetUser: projectPost.user.id}))
      notifyWith('Uusi keskustelu luotu onnistuneesti', 'success')
    } catch (error) {
      notifyWith('Luonti epäonnistui', 'error')
    }

  }

  if (!projectPost) {
    return (
      <Container sx={{ minHeight: '90vh', marginTop: '5rem', backgroundColor: '#393939', borderRadius: '0.5rem' }}>
        <Typography>Ladataan...</Typography>
      </Container>
    )
  }

  if (!user && projectPost.isPortalPost) {
    return ( <Container sx={{ minHeight: '90vh', marginTop: '5rem', backgroundColor: '#393939', borderRadius: '0.5rem' }}>
      <Typography>Et voi nähdä portaalipostauksia, ne ovat salaisia!</Typography>
      </Container>
    )
  }

  return (
    <Container sx={{ minHeight: '90vh', marginTop: '5rem', backgroundColor: '#393939', borderRadius: '0.5rem' }}>
        <Typography sx={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{projectPost.title}</Typography>
        <Typography sx={{ marginBottom: '1rem' }}>{projectPost.user.name}</Typography>
        <Typography sx={{
          whiteSpace: 'break-spaces'
        }}>{projectPost.description}</Typography>
        {user && user.isDeveloper === true && (
        <Togglable buttonLabel='Tee tarjous'>
          <MakeOfferForm projectPost={projectPost}/>
        </Togglable>
      )}
      {user && user.id !== projectPost.user.id && (
              <Button onClick={handleChatStart}>Aloita uusi keskustelu käyttäjän {projectPost.user.name} kanssa</Button>

      )}
      <Box>
        {projectPost.offers.map(offer => (
          <Box key={offer.id} sx={{ color: 'black', backgroundColor: 'white', borderRadius: '0.5rem', padding: '1rem', marginBottom: '1rem' }}>
            {offer.isApproved && (
              <Typography>Tarjous hyväksytty <CheckCircleOutline /></Typography>
            )}
            <Typography>{offer.timeStamp.split('T')[0]}</Typography>
            <Typography sx={{ whiteSpace: 'break-spaces' }}>{offer.description}</Typography>
            {user && user.id === projectPost.user.id && !offer.isApproved ? (
              <Button onClick={() => handleAcceptOffer(offer.id)}>Hyväksy tarjous</Button>
            ): null}
            {user && (user.id === projectPost.user.id || user.id === offer.user) && (
              <Button sx={{ color: 'red' }} onClick={() => handleDeleteOffer(offer.id)}>Poista tarjous</Button>
            )}
          </Box>
        ))}
      </Box>
    </Container>
  )
}

export default SingleProjectPage