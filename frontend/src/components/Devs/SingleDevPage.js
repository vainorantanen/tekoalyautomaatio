import { Box, Button, Container, Typography, Rating } from '@mui/material'
import React from 'react'
import {  useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'


const SingleDevPage = () => {

  const id = useParams().id

  const user = useSelector(({user}) => user)
  const dev = useSelector(({ users }) => users.find(p => p.id === id))
  const devRatings = useSelector(({ratings}) => ratings).filter(r => r.targetUser.id === dev.id)

  if (!dev) {
    return (
      <Container sx={{ minHeight: '90vh', marginTop: '5rem', backgroundColor: '#393939', borderRadius: '0.5rem' }}>
        <Typography>Ladataan...</Typography>
      </Container>
    )
  }

  return (
    <Container sx={{ minHeight: '90vh', marginTop: '5rem', backgroundColor: '#393939', borderRadius: '0.5rem' }}>
        <Box>
          <Typography sx={{ marginBottom: '1rem', fontSize: '1.3rem', textAlign: 'center',
           }} >{dev.name}</Typography>
          <Box sx={{ color: 'black', backgroundColor: 'white', borderRadius: '0.5rem', paddingBottom: '0.5rem',
        paddingLeft: '0.5rem', paddingRight: '0.5rem', marginBottom: '1rem' }}>
            <Typography sx={{
              whiteSpace: 'break-spaces',
              marginTop: '3rem' 
            }}>{dev.description}</Typography>
          </Box>
          <Typography>Tietoa kehittäjästä</Typography>
          <Typography>Sähköposti: {dev.email}</Typography>
          <Box sx={{ marginTop: '2rem' }}>
            <Typography sx={{ fontSize: '1.3rem' }}>Arvostelut</Typography>
            {user && user.id !== dev.id ? (
              <Typography>Oletko tehnyt yhteistyötä tähän kehittäjän kanssa?<Button component={Link} to={`/anna-arvostelu/${dev.id}`}>Anna arvostelu</Button></Typography>
            ): null}
            {devRatings.filter(r => r.showOnDevProfile).length > 0 ? (
              devRatings.filter(r => r.showOnDevProfile).map(rating => (
                <Box key={rating.id} sx={{ margin: '1rem', borderRadius: '0.5rem', padding: '1rem', 
                backgroundColor: 'white', color: 'black' }}>
                  <Rating value={rating.score} readOnly precision={1} max={5} />
                  <Typography sx={{ fontSize: '0.8rem' }}>{rating.user.name}</Typography>
                  <Typography sx={{ fontSize: '0.8rem' }}>{rating.timeStamp.split('T')[0]}</Typography>
                  <Typography>{rating.description}</Typography>
                  </Box>
              ))
            ): (
              <Typography>Ei vielä arvosteluja</Typography>
            )}
          </Box>
        </Box>
    </Container>
  )
}

export default SingleDevPage