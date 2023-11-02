import { Typography, Box, Container, Button,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'
import Togglable from '../Togglable'
import MakeOfferForm from './MakeOfferForm'
import { useSelector } from 'react-redux'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useNotification } from '../../hooks'
import { useDispatch } from 'react-redux'
import { addChat } from '../../reducers/chats'
import { useState } from 'react'
import { removePortalBid, updatePortalBid } from '../../reducers/portalBids'

const SinglePostBuyerView = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [chatTitle, setChatTitle] = useState('');

  const dispatch = useDispatch()
  const notifyWith = useNotification()

  const user = useSelector(({ user }) => user)
  const id = useParams().id
  const post = useSelector(({ portalPosts }) => portalPosts).find(p => p.id === id)

  const handleAcceptbid = async (bidId) => {
    const confirmed = window.confirm('Haluatko varmasti hyväksyä tämän tarjouksen?')
    if (!confirmed) {
      return // If the user clicks "Cancel," do nothing
    }
    try {
      const result = await dispatch(updatePortalBid(bidId))
      if (result && result.error) {
        notifyWith('Tapahtui virhe palvelimella', 'error')
        return
      } else {
        notifyWith('Tarjous hyväksytty', 'success')
      }
      
    } catch (error) {
      notifyWith('Tarjouksen hyväksyntä epäonnistui', 'error')
    }

  }

  const handleDeletebid = async (bidId) => {
    const confirmed = window.confirm('Haluatko varmasti poistaa tämän tarjouksen?')
    if (!confirmed) {
      return // If the user clicks "Cancel," do nothing
    }
    try {
      const result = await dispatch(removePortalBid(bidId))
      if (result && result.error) {
        notifyWith('Tapahtui virhe palvelimella', 'error')
        return
      } else {
        notifyWith('Poistettu onnistuneesti', 'success')
      }
    } catch (error) {
      notifyWith('Tarjouksen poisto epäonnistui', 'error')
    }

  }

  const openDialog = () => {
    setIsDialogOpen(true);
};

const closeDialog = () => {
    setIsDialogOpen(false);
    setChatTitle(''); // Clear the chat title when the dialog is closed
};


  const handleChatStart = async (offer) => {
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
      const result = await dispatch(addChat({targetUser: offer.user, title: chatTitle}))
      if (result && result.error) {
        notifyWith(result.error.response.data.error, 'error')
        return
      } else {
        notifyWith('Uusi keskustelu luotu onnistuneesti, löydät omat keskustelusi sivuvalikosta', 'success')
      }
    } catch (error) {
      notifyWith('Luonti epäonnistui', 'error')
    }

  }

  if (!post) {
    return (
        <Container sx={{ marginTop: '7rem', minHeight: '100vh' }}>
            <Typography>Ei postausta</Typography>
        </Container>
    )
  }

  return (
    <Container  sx={{ marginTop: '7rem', minHeight: '100vh' }}>
      <Box
        sx={{
          backgroundColor: 'white',
          padding: '2rem',
          border: '1px solid black',
          borderRadius: '1rem',
          marginLeft: '8rem',
          marginRight: '8rem',
          display: 'flex',
          flexDirection: 'column',
          color: 'black',
          '@media (max-width: 820px)': {
            marginLeft: '0.1rem',
            marginRight: '0.1rem',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            marginBottom: '1rem',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <Typography>{post.user.name}</Typography>
            {post.timeStamp ? (
              <Typography>Julkaistu {post.timeStamp.split('T')[0]}</Typography>
            ) : <Typography>Julkaistu yli vuosi sitten</Typography>}
          </div>
        </Box>
        <Typography style={{ whiteSpace: 'break-spaces' }}>{post.description}</Typography>
      </Box>
      {user && user.isDeveloper === true && (
        <Togglable buttonLabel='Tee tarjous'>
          <MakeOfferForm post={post}/>
        </Togglable>
      )}
      <Typography>Tarjoukset</Typography>
      <Box>
        {post.portalBids.length > 0 ? (post.portalBids.map(offer => (
          <Box key={offer.id} sx={{ color: 'black', backgroundColor: 'white', borderRadius: '0.5rem', padding: '1rem', marginBottom: '1rem' }}>
            {offer.isApproved && (
              <Typography>Tarjous hyväksytty <CheckCircleIcon/></Typography>
            )}
            <Typography>{offer.offeror}</Typography>
            <Typography>{offer.timeStamp.split('T')[0]}</Typography>
            <Typography sx={{ whiteSpace: 'break-spaces' }}>{offer.description}</Typography>
            {user && user.id === post.user.id && !offer.isApproved ? (
              <Button onClick={() => handleAcceptbid(offer.id)}>Hyväksy tarjous</Button>
            ): null}
            {user && user.id === post.user.id ? (
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
                  <Button onClick={() => handleChatStart(offer)}>Luo chat</Button>
            </DialogActions>
        </Dialog>
            {user && (user.id === post.user.id || user.id === offer.user) && (
              <Button sx={{ color: 'red' }} onClick={() => handleDeletebid(offer.id)}>Poista tarjous</Button>
            )}
          </Box>
        ))) : (
            <Typography>Ei vielä tarjouksia</Typography>
        )}
      </Box>
    </Container>
  )
}

export default SinglePostBuyerView