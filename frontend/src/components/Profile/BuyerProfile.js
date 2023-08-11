import { Container, Typography, Box } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import BuyersPosts from './BuyersPosts'

const BuyerProfile = () => {
    const user = useSelector(({ user }) => user)

    if (!user) {
        return null
    }

  return (
    <Container sx={{ marginTop: '1rem' }}>
        <Typography>Käyttäjän {user.name} profiili</Typography>
        <Typography>Tietoja minusta:</Typography>
        <Box sx={{ border: '2px solid white', borderRadius: '0.5rem', padding: '0.5rem', marginTop: '1rem' }}>
            <Typography sx={{ whiteSpace: 'break-spaces' }}>{user.description}</Typography>
        </Box>
        <BuyersPosts />
    </Container>
  )
}

export default BuyerProfile