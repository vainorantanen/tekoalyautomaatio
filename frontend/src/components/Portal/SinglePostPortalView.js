import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import PortalBidCard from './PortalBidCard'
import Togglable from '../Togglable'
import { useParams } from 'react-router-dom'
import MakeOfferForm from './MakeOfferForm'
import SingleProjectInfo from '../OpenProjects/SingleProjectInfo'
import { formatDate } from '../../Functions/formatDate'

const SinglePostPortalView = () => {
  const user = useSelector(({user}) => user)

  const {id} = useParams()

  const post = useSelector(({portalPosts}) => portalPosts).find(p => p.id === id)
  const portalBidsToShow = useSelector(({portalBids}) => portalBids).filter(bid => bid.targetPost === id)

// Funktioita


// portaalipostauksen voi nähdä sen lisännyt käyttäjä ja kehittäjät
  if (!user || !post || (!user.isDeveloper && post.user.id !== user.id)) {
    return (
      <Container sx={{ marginTop: '5rem', minHeight: '90vh' }}>
        <Typography>Kirjaudu sisään nähdäksesi portaali</Typography>
      </Container>
    )
  }

return (
  <Container sx={{ marginTop: '5rem', minHeight: '90vh' }}>
    <Typography sx={{ textAlign: 'center', fontSize: '1.3rem',
  marginBottom: '1rem' }}>Portaali-ilmoitus</Typography>
  {new Date(post.dueDate) < new Date() && (
      <Typography variant='h4' sx={{ textAlign: 'center' }}>Ilmoitus on sulkeutunut {formatDate(post.dueDate)}</Typography>
    )}
    <SingleProjectInfo post={post}/>
    {/*Näkymä kehittäjille*/}
    {user && user.isDeveloper && new Date(post.dueDate) > new Date() && (
      <Box>
        <Togglable buttonLabel='Tee tarjous'>
          <MakeOfferForm portalPost={post}/>
        </Togglable>
    
        <Typography sx={{ fontSize: '1.5rem', marginTop: '1rem',
  marginBottom: '1rem', borderBottom: '1px solid black', textAlign: 'center' }}>Tarjouksesi tähän ilmoitukseen</Typography>
      <Box>
        {user && portalBidsToShow.length > 0 ? portalBidsToShow.map(offer => (
          <Box key={offer.id}>
            <PortalBidCard offer={offer} post={post}/>
          </Box>
        )): <Typography sx={{ textAlign: 'center' }}>Et ole tarjonnut tähän vielä</Typography>}
      </Box>
      </Box>
    )}
    {/*Näkymä portaalipostauksen tekijälle */}
    {user && user.id === post.user.id && (
      <Box>
        <Typography sx={{ fontSize: '1.5rem', marginTop: '1rem',
  marginBottom: '1rem', borderBottom: '1px solid black', textAlign: 'center' }}>Tarjoukset</Typography>
    <Box>
      {portalBidsToShow && portalBidsToShow.length > 0 ? (
        portalBidsToShow.map(offer => (
        <Box key={offer.id}>
          <PortalBidCard offer={offer} post={post}/>
        </Box>
      ))): (
        <Typography sx={{ textAlign: 'center' }}>Ei vielä tarjouksia</Typography>
      )}
    </Box>
        </Box>
    )}
  </Container>
)
}

export default SinglePostPortalView