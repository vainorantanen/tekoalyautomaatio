import React from 'react'
import { Typography, Box, Button, Divider } from '@mui/material'
import { useSelector } from 'react-redux'
import SingleBidCard from './SingleBidCard'
import { Link } from 'react-router-dom'

const DevBids = () => {
    const user = useSelector(({user}) => user)

  const userFeedBids = useSelector(({projectOffers}) => projectOffers).filter(p => p.user.id === user.id)
  const devPortalBids = useSelector(({portalBids}) => portalBids)

  if (!user) {
    return null
  }

  console.log(userFeedBids)

  return (
    <Box sx={{ marginTop: '1rem' }}>
      <Typography sx={{ fontSize: '1.3rem'}}>Avoimiin ilmoituksiin tehdyt tarjoukset</Typography>
      <Divider sx={{ my: 4 }} />
        {userFeedBids && userFeedBids.length > 0 ? (userFeedBids.map(bid => (
        <Box key={bid.id}>
            <SingleBidCard offer={bid}/>
            <Button component={Link} to={`/avoimetprojektit/${bid.targetPost}`}>Siirry ilmoitukseen</Button>
        </Box>
      ))): (
        <Typography>Ei vielä tarjouksia</Typography>
      )}
      <Divider sx={{ my: 4 }} />
    <Typography sx={{ fontSize: '1.3rem' }}>Portaali-ilmoituksiin tehdyt tarjoukset</Typography>
        {devPortalBids && devPortalBids.length > 0 ? (devPortalBids.map(
          bid => (
            <Box key={bid.id}>
              <SingleBidCard offer={bid}/>
              <Button component={Link} to={`/portaali/ilmoitukset/${bid.targetPost}`}>Siirry ilmoitukseen</Button>
            </Box>
          )
        )): (
          <Typography>Ei vielä tarjouksia</Typography>
        )}

    </Box>
  )
}

export default DevBids