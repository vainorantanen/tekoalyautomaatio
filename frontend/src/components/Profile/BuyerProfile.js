import { Container, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

const BuyerProfile = () => {
    const user = useSelector(({ user }) => user)

    if (!user) {
        return null
    }

  return (
    <Container sx={{ marginTop: '1rem' }}>
        <Typography>Käyttäjän {user.name} profiili</Typography>
    </Container>
  )
}

export default BuyerProfile