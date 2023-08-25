import { Typography, Box, Container, Button } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'
import Togglable from '../Togglable'
import MakeOfferForm from './MakeOfferForm'
import { useSelector } from 'react-redux'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useNotification } from '../../hooks'
import { useDispatch } from 'react-redux'
import { removeOfferFromPortalPost } from '../../reducers/portalPosts'
import { addChat } from '../../reducers/chats'

const SinglePostDevView = () => {

  const dispatch = useDispatch()
  const notifyWith = useNotification()

  const user = useSelector(({ user }) => user)
  const id = useParams().id
  const post = useSelector(({ portalPosts }) => portalPosts).find(p => p.id === id)

  const handleDeletebid = async (bidId) => {
    const confirmed = window.confirm('Haluatko varmasti poistaa tämän tarjouksen?')
    if (!confirmed) {
      return // If the user clicks "Cancel," do nothing
    }
    try {
      dispatch(removeOfferFromPortalPost(bidId, post.id))
      notifyWith('Poistettu onnistuneesti', 'success')
    } catch (error) {
      notifyWith('Tarjouksen poisto epäonnistui', 'error')
    }

  }

  const handleChatStart = async () => {
    const confirmed = window.confirm(`Luodaanko uusi keskustelu käyttäjän ${post.user.name} kanssa?`)
    if (!confirmed) {
      return // If the user clicks "Cancel," do nothing
    }
    try {
      dispatch(addChat({targetUser: post.user.id}))
      notifyWith('Uusi keskustelu luotu onnistuneesti', 'success')
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

  const userBidsOnPost = post.offers.filter(bid =>
    bid.user === user.id
  );

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
          color: 'black',
          flexDirection: 'column',
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
          <MakeOfferForm portalPost={post}/>
        </Togglable>
      )}
      {user && user.id !== post.user.id && (
              <Button onClick={handleChatStart}>Aloita uusi keskustelu käyttäjän {post.user.name} kanssa</Button>

      )}
      <Typography sx={{ textAlign: 'center', marginBottom: '1rem' }}>Omat tarjouksesi tähän projektiin</Typography>
      <Box>
        {user && userBidsOnPost.length > 0 ? userBidsOnPost.map(offer => (
          <Box key={offer.id} sx={{ color: 'black', backgroundColor: 'white', borderRadius: '0.5rem', padding: '1rem', marginBottom: '1rem' }}>
            {offer.isApproved && (
              <Typography>Tarjous hyväksytty <CheckCircleIcon/></Typography>
            )}
            <Typography>{offer.offeror}</Typography>
            <Typography>{offer.timeStamp.split('T')[0]}</Typography>
            <Typography sx={{ whiteSpace: 'break-spaces', marginBottom: '1rem', marginTop: '1rem' }}>{offer.description}</Typography>
            {user && (user.id === post.user.id || user.id === offer.user) && (
              <Button sx={{ color: 'red' }} onClick={() => handleDeletebid(offer.id)}>Poista tarjous</Button>
            )}
          </Box>
        )): <Typography sx={{ textAlign: 'center' }}>Et ole tarjonnut tähän vielä</Typography>}
      </Box>
    </Container>
  )
}

export default SinglePostDevView