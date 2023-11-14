import { Box, Button, Container, Typography,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useNotification } from '../../hooks'
import MakeOfferForm from './MakeOfferForm'
import Togglable from '../Togglable'
import { modifyOfferApprovedState, removOfferFromProjectPost } from '../../reducers/projectPosts'
import { addChat } from '../../reducers/chats'
import { useState } from 'react'
import SingleProjectInfo from './SingleProjectInfo'
import ProjectOfferCard from './ProjectOfferCard'


const SingleProjectPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [chatTitle, setChatTitle] = useState('');

  const dispatch = useDispatch()
  const notifyWith = useNotification()

  const id = useParams().id

  const user = useSelector(({ user }) => user)
  const projectPost = useSelector(({ projectPosts }) => projectPosts.find(p => p.id === id))

  const openDialog = () => {
    setIsDialogOpen(true);
};

const closeDialog = () => {
    setIsDialogOpen(false);
    setChatTitle(''); // Clear the chat title when the dialog is closed
};

  const handleModifyOfferState = async (offerId) => {
    const confirmed = window.confirm('Vahvistetaanko muutos?')
        if (!confirmed) {
          return // If the user clicks "Cancel," do nothing
        }
    try {
      const result = await dispatch(modifyOfferApprovedState(offerId, projectPost.id))
      if (result && result.error) {
        notifyWith(result.error.response.data.error, 'error')
        return
      } else {
        notifyWith('Tila muutettu onnistuneesti', 'success')
      }
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

  const handleChatStartWithProjectOwner = async () => {
    if (chatTitle.trim() === '') {
      notifyWith('Anna chatille otsikko', 'error');
      return;
  }

  closeDialog();

    const confirmed = window.confirm(`Luodaanko uusi keskustelu käyttäjän ${projectPost.user.name} kanssa?`)
    if (!confirmed) {
      return // If the user clicks "Cancel," do nothing
    }
    try {
      dispatch(addChat({targetUser: projectPost.user.id, title: chatTitle}))
      notifyWith('Uusi keskustelu luotu onnistuneesti, löydät omat keskustelusi sivuvalikosta', 'success')
    } catch (error) {
      notifyWith('Luonti epäonnistui', 'error')
    }

  }

  const handleChatStartWithOfferor = async (offer) => {
    
    if (chatTitle.trim() === '') {
      notifyWith('Anna chatille otsikko', 'error');
      return;
  }

  closeDialog();

    const confirmed = window.confirm(`Luodaanko uusi keskustelu käyttäjän ${offer.offeror} kanssa?`)
    if (!confirmed) {
      return // If the user clicks "Cancel," do nothing
    }
    
    try {
      dispatch(addChat({targetUser: offer.user, title: chatTitle}))
      notifyWith('Uusi keskustelu luotu onnistuneesti, löydät omat keskustelusi sivuvalikosta', 'success')
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
        <Box>
          <SingleProjectInfo post={projectPost} />
        </Box>
        {user && user.isDeveloper === true && (
        <Togglable buttonLabel='Tee tarjous'>
          <MakeOfferForm projectPost={projectPost}/>
        </Togglable>
      )}
      {user && user.id !== projectPost.user.id && (
              <Button onClick={openDialog}>Aloita uusi keskustelu käyttäjän {projectPost.user.name} kanssa</Button>

      )}
      <Box sx={{ marginTop: '2rem' }}>
        <Typography sx={{ marginBottom: '2rem' }}>Tarjoukset</Typography>
        {projectPost.offers.map(offer => (
          <Box key={offer.id}>
            <ProjectOfferCard offer={offer}/>
            {user && user.id === projectPost.user.id && !offer.isApproved ? (
              <Button onClick={() => handleModifyOfferState(offer.id)}>Hyväksy tarjous</Button>
            ): null}
            {user && user.id === projectPost.user.id && offer.isApproved ? (
              <Button onClick={() => handleModifyOfferState(offer.id)}>Epähyväksy tarjous</Button>
            ): null}
            {user && user.id === projectPost.user.id ? (
              <Button onClick={openDialog}>Aloita keskustelu tarjoajan {offer.offeror} kanssa</Button>
            ): null}

<Dialog open={isDialogOpen} onClose={closeDialog}>
            <DialogTitle>Anna chatille otsikko</DialogTitle>
            <DialogContent>
                <TextField
                    label="Chatin otsikko"
                    variant="outlined"
                    fullWidth
                    value={chatTitle}
                    onChange={(e) => setChatTitle(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialog}>Peruuta</Button>
                {user && user.id === projectPost.user.id ? (
                  <Button onClick={() => handleChatStartWithOfferor(offer)}>Luo chat</Button>
                ): (
                  <Button onClick={handleChatStartWithProjectOwner}>Luo chat</Button>
                )}
            </DialogActions>
        </Dialog>

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