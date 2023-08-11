import { Container, Typography, Box } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import BuyersPosts from './BuyersPosts'

const BuyerProfile = () => {
  const localUser = useSelector(({user}) => user)
  const user = useSelector(({users}) => users).find(u => u.id === localUser.id)

    if (!user) {
        return null
    }

  return (
    <Container sx={{ marginTop: '1rem' }}>
        <Typography sx={{ marginBottom: '1rem' }}>Käyttäjän {user.name} profiili</Typography>
        <Typography sx={{ marginBottom: '1rem' }}>Tietoja minusta:</Typography>
        <Typography>Nimi {user.name}</Typography>
        <Typography>Käyttäjätunnus {user.username}</Typography>
        <Typography>Sähköposti {user.email}</Typography>
        <Box sx={{ border: '2px solid white', borderRadius: '0.5rem', padding: '0.5rem', marginTop: '1rem', marginBottom: '1rem' }}>
            <Typography sx={{ whiteSpace: 'break-spaces' }}>{user.description}</Typography>
        </Box>
        <BuyersPosts />
    </Container>
  )
}

export default BuyerProfile