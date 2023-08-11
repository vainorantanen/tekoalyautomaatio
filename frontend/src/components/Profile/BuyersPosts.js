import { Box, Typography, Container, Button } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BuyersPosts = () => {
    const user = useSelector(({user}) => user)

    const userPosts = useSelector(({ projectPosts }) => projectPosts).filter(p => p.user.id === user.id)

  if (!userPosts) {
    return (
      <Container>
        <Typography>Ladataan...</Typography>
      </Container>
    )
  }

  return (
    <Box>
        <Typography>Sinun ilmoituksesi</Typography>
        <Box>
        {userPosts.length > 0 ? userPosts.map(p => (
            <Box key={p.id} sx={{ backgroundColor: 'white', color: 'black', padding: '0.5rem',
            borderRadius: '0.5rem' }}>
                <Typography sx={{ fontSize: '1.3rem' }}>{p.title}</Typography>
                <Typography>{p.description}</Typography>
                <Button component={Link} to={`/profiili/muokkaa/${p.id}`} >Muokkaa ilmoituksen sisältöä</Button>
            </Box>  
        )) : (
            <Typography>Ei vielä ilmoituksia</Typography>
        )}
        </Box>
    </Box>
  )
}

export default BuyersPosts